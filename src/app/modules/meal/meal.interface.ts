export interface IMeal {
  //* meal interface properties
  _id?: string;
  providerId?: string;
  name: string;
  description: string;
  ingredients: string[];
  isFeatured: boolean;
  images: string[];
  price: number;
  isAvailable: boolean;
  isDeleted: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}
