import { IMealProvider } from './mealProvider.interface';
import { MealProvider } from './mealProvider.model';

const createOneIntoDB = async (payload: IMealProvider): Promise<IMealProvider> => {
  const result = await MealProvider.create(payload);
  return result;
};

const getAllFromDB = async (): Promise<IMealProvider[]> => {
  const result = await MealProvider.find();
  return result;
};

const getOneFromDB = async (id: string): Promise<IMealProvider | null> => {
  const result = await MealProvider.findById(id);
  return result;
};

const updateOneIntoDB = async (
  id: string,
  payload: Partial<IMealProvider>
): Promise<IMealProvider | null> => {
  const result = await MealProvider.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteOneFromDB = async (id: string): Promise<IMealProvider | null> => {
  const result = await MealProvider.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const MealProviderServices = {
  createOneIntoDB,
  getAllFromDB,
  getOneFromDB,
  updateOneIntoDB,
  deleteOneFromDB,
};
