import { IMeal } from './meal.interface';
import { Meal } from './meal.model';

const createOneIntoDB = async (payload: IMeal): Promise<IMeal> => {
  const result = await Meal.create(payload);
  return result;
};

const getAllFromDB = async (): Promise<IMeal[]> => {
  const result = await Meal.find();
  return result;
};

const getOneFromDB = async (id: string): Promise<IMeal | null> => {
  const result = await Meal.findById(id);
  return result;
};

const updateOneIntoDB = async (
  id: string,
  payload: Partial<IMeal>
): Promise<IMeal | null> => {
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
