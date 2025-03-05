import { z } from 'zod';

const createOrderSchema = z.object({
  //* create Order schema
  body: z.object({
    mealId: z.string({ required_error: 'Meal id is required' }),
    price: z.number({ required_error: 'Price is required' }),
    deliveryAddress: z.string({
      required_error: 'Delivery address is required',
    }),
    instruction: z
      .string({ required_error: 'Instruction is required' })
      .optional(),
  }),
});

const updateOrderSchema = z.object({
  body: z.object({
    //* update Order schema
    status: z.string({ required_error: 'Status is required' }),
  }),
});

export const OrderValidations = {
  createOrderSchema,
  updateOrderSchema,
};
