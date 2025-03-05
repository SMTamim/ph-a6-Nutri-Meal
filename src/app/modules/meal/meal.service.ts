import { JwtPayload } from 'jsonwebtoken';
import { IMeal } from './meal.interface';
import { Meal } from './meal.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { mealSearchableFields } from './meal.constant';

const createOneIntoDB = async (
  userJWTDecoded: JwtPayload,
  payload: IMeal,
): Promise<IMeal> => {
  const user = await User.isUserExistByEmail(userJWTDecoded.email);
  if (!user?._id)
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Unauthorized or user not found!',
    );
  if (user.role !== 'provider')
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');

  payload.providerId = user._id;
  const result = await Meal.create(payload);
  return result;
};

const getAllFromDB = async (query: Record<string, unknown>) => {
  const mealQuery = new QueryBuilder(Meal.find(), query);
  mealQuery.search(mealSearchableFields).filter().sort().paginate().fields();
  const meals = await mealQuery.modelQuery;
  const meta = await mealQuery.countTotal();

  return {
    meals,
    meta,
  };
};

const getOneFromDB = async (id: string): Promise<IMeal | null> => {
  const result = await Meal.findById(id);
  return result;
};

const updateOneIntoDB = async (
  id: string,
  payload: Partial<IMeal>,
  userJWTDecoded: JwtPayload,
): Promise<IMeal | null> => {
  const user = await User.isUserExistByEmail(userJWTDecoded.email);
  if (!user?._id)
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Unauthorized or user not found!',
    );
  if (user.role !== 'provider')
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');

  const result = await Meal.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteOneFromDB = async (id: string): Promise<IMeal | null> => {
  const result = await Meal.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const MealServices = {
  createOneIntoDB,
  getAllFromDB,
  getOneFromDB,
  updateOneIntoDB,
  deleteOneFromDB,
};
