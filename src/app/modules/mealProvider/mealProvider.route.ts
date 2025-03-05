import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MealProviderControllers } from './mealProvider.controller';
import { MealProviderValidations } from './mealProvider.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(MealProviderValidations.createMealProviderSchema),
  MealProviderControllers.createOne,
);

router.get('/', MealProviderControllers.getAll);
router.get('/:id', MealProviderControllers.getOne);

router.patch(
  '/:id',
  validateRequest(MealProviderValidations.updateMealProviderSchema),
  MealProviderControllers.updateOne,
);

router.delete('/:id', MealProviderControllers.deleteOne);

export const MealProviderRoutes = router;
