import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MealProviderServices } from './mealProvider.service';

const createOne = catchAsync(async (req, res) => {
  const result = await MealProviderServices.createOneIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mealprovider created successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await MealProviderServices.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mealproviders retrieved successfully',
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await MealProviderServices.getOneFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mealprovider retrieved successfully',
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await MealProviderServices.updateOneIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mealprovider updated successfully',
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await MealProviderServices.deleteOneFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mealprovider deleted successfully',
    data: result,
  });
});

export const MealProviderControllers = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
