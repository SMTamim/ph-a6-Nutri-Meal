import { z } from 'zod';

const createOrderSchema = z.object({
  body: z.object({
    //* create Order schema
  }),
});

const updateOrderSchema = z.object({
  body: z.object({
    //* update Order schema
  }),
});

export const OrderValidations = {
  createOrderSchema,
  updateOrderSchema,
};
