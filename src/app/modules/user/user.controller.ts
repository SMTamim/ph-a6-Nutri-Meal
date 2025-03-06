import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getMe = catchAsync(async (req, res) => {
  const result = await UserServices.getMeFromDB(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

// get all users
const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const updateMyData = catchAsync(async (req, res) => {
  const result = await UserServices.updateMyDataIntoDB(req.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const updatePassword = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserPasswordIntoDB(
    req.user,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password has been updated successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  updateMyData,
  updateUser,
  getAllUsers,
  updatePassword,
  getMe,
};
