import { Router } from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import UserValidations from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.get('/', auth('admin'), UserControllers.getAllUsers);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);

export const UserRoutes = router;
