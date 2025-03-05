export type TOrderStatus =
  | 'pending'
  | 'processing'
  | 'accepted'
  | 'rejected'
  | 'delivered'
  | 'cancelled';

export interface IOrder {
  //* order interface properties
  _id?: string;
  customerId?: string;
  providerId?: string;
  mealId?: string;
  status: TOrderStatus;
  deliveryAddress: string;
  deliveryTime?: string;
  instruction: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}
