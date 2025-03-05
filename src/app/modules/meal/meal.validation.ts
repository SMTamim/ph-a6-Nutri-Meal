import { z } from 'zod';

const createMealSchema = z.object({
  body: z.object({
    //* create Meal schema
  }),
});

const updateMealSchema = z.object({
  body: z.object({
    //* update Meal schema
  }),
});

export const MealValidations = {
  createMealSchema,
  updateMealSchema,
};
