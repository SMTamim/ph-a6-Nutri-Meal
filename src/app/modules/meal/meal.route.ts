import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MealControllers } from './meal.controller';
import { MealValidations } from './meal.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(MealValidations.createMealSchema),
  MealControllers.createOne,
);

router.get('/', MealControllers.getAll);
router.get('/:id', MealControllers.getOne);

router.patch(
  '/:id',
  validateRequest(MealValidations.updateMealSchema),
  MealControllers.updateOne,
);

router.delete('/:id', MealControllers.deleteOne);

export const MealRoutes = router;
