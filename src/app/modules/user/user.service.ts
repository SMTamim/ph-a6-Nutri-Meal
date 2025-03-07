import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchableFields } from './user.constant';
import { startSession } from 'mongoose';
import { MealProvider } from '../mealProvider/mealProvider.model';
import { IMealProvider } from '../mealProvider/mealProvider.interface';

const getMeFromDB = async (userJWTDecoded: JwtPayload) => {
  const user = await User.findOne({ email: userJWTDecoded.email });
  if (user?.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted!');
  }
  if (!user?._id) throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  return user;
};

// creates a new user to database
const createUserIntoDB = async (payload: TUser & IMealProvider) => {
  const userExists = await User.isUserExistByEmail(payload.email);
  if (userExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
  }
  const session = await startSession();
  try {
    session.startTransaction();
    const result = await User.create([{ ...payload }], { session });
    if (result.length > 0) {
      const createdUser = result[0];

      // If user is a provider, create meal provider
      if (createdUser.role === 'provider') {
        await MealProvider.create(
          [
            {
              userId: createdUser._id,
              cuisineSpecialties: payload.cuisineSpecialties,
              experience: payload.experience,
            },
          ],
          { session },
        );
      }

      const user = await User.findById(createdUser._id)
        .select('name email')
        .session(session);

      await session.commitTransaction();
      await session.endSession();
      return user;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
};

// gets all users from database
const getAllUsersFromDB = async (
  query: Record<string, unknown>,
  userJWTDecoded: JwtPayload,
) => {
  if (userJWTDecoded) {
    const user = await User.isUserExistByEmail(userJWTDecoded.email);

    if (!user?._id) throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    const userQuery = new QueryBuilder(
      User.find({ _id: { $ne: user._id } }),
      query,
    );
    userQuery.search(userSearchableFields).sort().paginate().fields();
    const users = await userQuery.modelQuery;
    const meta = await userQuery.countTotal();
    return { users, meta };
  }
  throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
};

const updateMyDataIntoDB = async (
  userJWTDecoded: JwtPayload,
  payload: Partial<TUser>,
) => {
  if (userJWTDecoded) {
    const user = await User.isUserExistByEmail(userJWTDecoded.email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (user.isBlocked || user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked or deleted');
    }

    const result = await User.findOneAndUpdate({ _id: user._id }, payload, {
      new: true,
    });
    return result;
  }
  throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const updateUserPasswordIntoDB = async (
  userJWTDecoded: JwtPayload,
  payload: { password: string; currentPassword: string },
) => {
  const user = await User.isUserExistByEmail(userJWTDecoded.email);
  if (!user?._id) throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  if (!(await User.comparePassword(payload.currentPassword, user.password))) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Current password is incorrect');
  }

  const result = await User.findOneAndUpdate(
    { _id: user._id },
    { password: payload.password },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

/**
 * Deletes a user from the database.
 * @param id - The ID of the user to delete.
 * @returns The deleted user.
 * @throws AppError - 404 if the user doesn't exist.
 */
const deleteUserFromDB = async (id: string) => {
  // Check if the user exists
  const user = await User.isUserExist(id);
  if (!user) {
    // If the user doesn't exist, throw a 404 error
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This user doesn't exist, so we can't delete them",
    );
  }

  // Find the user by ID and update their isBlocked field to true
  const deletedUser = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  return deletedUser;
};

/**
 * Blocks a user in the database.
 * @param id - The ID of the user to block.
 * @returns The blocked user.
 * @throws AppError - 404 if the user doesn't exist.
 */
const blockUserInDB = async (id: string) => {
  // Check if the user exists
  const user = await User.isUserExist(id);
  if (!user) {
    // If they don't, throw a 404 error
    throw new AppError(httpStatus.NOT_FOUND, "This user doesn't exist");
  }

  // Find the user by ID and update their isBlocked field to true
  const blockedUser = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true, runValidators: true },
  );

  return blockedUser;
};

export const UserServices = {
  getMeFromDB,
  createUserIntoDB,
  updateUserIntoDB,
  updateMyDataIntoDB,
  updateUserPasswordIntoDB,
  getAllUsersFromDB,
  deleteUserFromDB,
  blockUserInDB,
};
