import { JwtPayload } from 'jsonwebtoken';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { User } from '../user/user.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { Meal } from '../meal/meal.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { orderFilterableFields } from './order.constant';

const createOneIntoDB = async (
  userJWTDecoded: JwtPayload,
  payload: IOrder,
): Promise<IOrder> => {
  const user = await User.isUserExistByEmail(userJWTDecoded.email);
  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
  else if (user.role !== 'customer')
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized!');

  payload.customerId = user._id;

  const meal = await Meal.findById(payload.mealId);
  if (!meal) throw new AppError(httpStatus.NOT_FOUND, 'Meal not found');

  payload.price = meal.price;
  payload.providerId = meal.providerId;
  payload.status = 'pending';
  const result = await Order.create(payload);
  return result;
};

const getAllFromDB = async (
  userJWTDecoded: JwtPayload,
  query: Record<string, unknown>,
) => {
  const user = await User.isUserExistByEmail(userJWTDecoded.email);
  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
  let orderQuery;
  if (user.role === 'customer') {
    orderQuery = new QueryBuilder(Order.find({ customerId: user._id }), query);
  } else if (user.role === 'provider') {
    orderQuery = new QueryBuilder(Order.find({ providerId: user._id }), query);
  } else {
    orderQuery = new QueryBuilder(Order.find(), query);
  }

  orderQuery.search(orderFilterableFields).filter().sort().paginate().fields();
  const orders = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return {
    orders,
    meta,
  };
};

const getOneFromDB = async (
  userJWTDecoded: JwtPayload,
  id: string,
): Promise<IOrder | null> => {
  const user = await User.isUserExistByEmail(userJWTDecoded.email);
  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');

  let order;
  if (user.role === 'customer') {
    order = await Order.findOne({ _id: id, customerId: user._id });
  } else if (user.role === 'provider') {
    order = await Order.findOne({ _id: id, providerId: user._id });
  } else {
    order = await Order.findOne({ _id: id });
  }
  if (!order) throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  return order;
};

const updateOneIntoDB = async (
  id: string,
  payload: Partial<IOrder>,
  userJWTDecoded: JwtPayload,
): Promise<IOrder | null> => {
  const user = await User.isUserExistByEmail(userJWTDecoded.email);
  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');

  let result = await Order.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }

  if (user.role === 'customer') {
    if (result?.customerId?.toString() !== user._id?.toString()) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }
  } else if (user.role === 'provider') {
    if (result?.providerId?.toString() !== user._id?.toString()) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }
  }

  if (result?.status !== 'pending' && user.role === 'customer') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Order is not pending');
  }

  result = await Order.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteOneFromDB = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const OrderServices = {
  createOneIntoDB,
  getAllFromDB,
  getOneFromDB,
  updateOneIntoDB,
  deleteOneFromDB,
};
