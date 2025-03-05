import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MealControllers } from './meal.controller';
import { MealValidations } from './meal.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('provider'),
  validateRequest(MealValidations.createMealSchema),
  MealControllers.createOne,
);

router.get('/', MealControllers.getAll);
router.get('/:id', MealControllers.getOne);

router.patch(
  '/:id',
  auth('provider'),
  validateRequest(MealValidations.updateMealSchema),
  MealControllers.updateOne,
);

router.delete('/:id', auth('provider'), MealControllers.deleteOne);

export const MealRoutes = router;
