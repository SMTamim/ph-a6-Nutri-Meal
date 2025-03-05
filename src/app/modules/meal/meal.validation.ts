import { z } from 'zod';

const createMealSchema = z.object({
  body: z.object({
    //* create Meal schema
    name: z.string({ required_error: 'name is required' }),
    description: z.string({ required_error: 'description is required' }),
    ingredients: z.array(z.string(), {
      required_error: 'ingredients are required',
    }),
    price: z.number({ required_error: 'price is required' }),
    isAvailable: z.boolean({ required_error: 'isAvailable is required' }),
  }),
});

const updateMealSchema = z.object({
  body: z.object({
    //* update Meal schema
    name: z.string({ required_error: 'name is required' }).optional(),
    description: z
      .string({ required_error: 'description is required' })
      .optional(),
    ingredients: z
      .array(z.string(), {
        required_error: 'ingredients are required',
      })
      .optional(),
    price: z.number({ required_error: 'price is required' }).optional(),
    isAvailable: z
      .boolean({ required_error: 'isAvailable is required' })
      .optional(),
  }),
});

export const MealValidations = {
  createMealSchema,
  updateMealSchema,
};
