import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { UserControllers } from '../user/user.controller';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/me', auth('admin', 'customer', 'provider'), UserControllers.getMe);

// register new user
router.post(
  '/register',
  validateRequest(AuthValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.patch(
  '/update-me',
  auth('customer', 'provider'),
  validateRequest(AuthValidations.updateMyDataValidationSchema),
  UserControllers.updateMyData,
);

router.patch(
  '/update-password',
  auth('admin', 'customer', 'provider'),
  validateRequest(AuthValidations.updatePasswordValidationSchema),
  UserControllers.updatePassword,
);

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
