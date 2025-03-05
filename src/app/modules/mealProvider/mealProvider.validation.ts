import { z } from 'zod';

const createMealProviderSchema = z.object({
  body: z.object({
    //* create MealProvider schema
  }),
});

const updateMealProviderSchema = z.object({
  body: z.object({
    //* update MealProvider schema
  }),
});

export const MealProviderValidations = {
  createMealProviderSchema,
  updateMealProviderSchema,
};
