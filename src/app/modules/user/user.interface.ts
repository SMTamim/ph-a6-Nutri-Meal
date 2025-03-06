import { Model } from 'mongoose';

export type TUserRole = 'customer' | 'provider' | 'admin';

export interface TUser {
  _id?: string;
  name: string;
  image?: string;
  email: string;
  password: string;
  role: TUserRole;
  address: string;
  isBlocked: boolean;
  isDeleted: boolean;
  passwordUpdatedAt?: Date;
}

export interface TUserModel extends Model<TUser> {
  isUserExist(id: string): Promise<TUser | null>;
  isUserExistByEmail(email: string): Promise<TUser | null>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
  isUserBlocked(userId: string): Promise<boolean>;
  isUserDeleted(userId: string): Promise<boolean>;
}
