export interface IReview {
  //* review interface properties
  _id?: string;
  customerId?: string;
  providerId?: string;
  mealId?: string;
  rating: number;
  review?: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted: boolean;
}
