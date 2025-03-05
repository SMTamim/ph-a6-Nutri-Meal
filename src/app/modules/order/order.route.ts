import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderControllers } from './order.controller';
import { OrderValidations } from './order.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('customer'),
  validateRequest(OrderValidations.createOrderSchema),
  OrderControllers.createOne,
);

router.get('/', auth('admin', 'customer', 'provider'), OrderControllers.getAll);
router.get(
  '/:id',
  auth('admin', 'customer', 'provider'),
  OrderControllers.getOne,
);

router.patch(
  '/:id',
  auth('admin', 'customer', 'provider'),
  validateRequest(OrderValidations.updateOrderSchema),
  OrderControllers.updateOne,
);

router.delete('/:id', auth('admin'), OrderControllers.deleteOne);

export const OrderRoutes = router;
