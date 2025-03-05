import { IReview } from './review.interface';
import { Review } from './review.model';

const createOneIntoDB = async (payload: IReview): Promise<IReview> => {
  const result = await Review.create(payload);
  return result;
};

const getAllFromDB = async (): Promise<IReview[]> => {
  const result = await Review.find();
  return result;
};

const getOneFromDB = async (id: string): Promise<IReview | null> => {
  const result = await Review.findById(id);
  return result;
};

const updateOneIntoDB = async (
  id: string,
  payload: Partial<IReview>
): Promise<IReview | null> => {
  const result = await Review.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteOneFromDB = async (id: string): Promise<IReview | null> => {
  const result = await Review.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ReviewServices = {
  createOneIntoDB,
  getAllFromDB,
  getOneFromDB,
  updateOneIntoDB,
  deleteOneFromDB,
};
