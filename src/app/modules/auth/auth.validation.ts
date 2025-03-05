import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
    address: z.string({ required_error: 'Address is required' }),
    role: z.enum(['customer', 'provider'], {
      required_error: 'Role is required',
      invalid_type_error: "Role must be either 'customer' or 'provider'",
    }),
    cuisineSpecialties: z
      .array(z.string())
      .min(1, { message: 'At least one cuisine specialty is required' })
      .optional(),
    experience: z
      .string({ required_error: 'Experience is required' })
      .optional(),
  }),
});

const updatePasswordValidationSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'Password is required' }),
    currentPassword: z.string({
      required_error: 'Current password is required',
    }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const AuthValidations = {
  createUserValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
  updatePasswordValidationSchema,
};
