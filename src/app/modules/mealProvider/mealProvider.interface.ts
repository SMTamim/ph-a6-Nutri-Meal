export interface IMealProvider {
  //* mealProvider interface properties
  _id?: string;
  userId?: string;
  cuisineSpecialties: string[];
  rating: number;
  totalOrders: number;
  experience: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted: boolean;
}
