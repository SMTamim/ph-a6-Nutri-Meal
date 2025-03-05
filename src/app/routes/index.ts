import { Router } from 'express';
import { HomeRoutes } from '../modules/home/home.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { UserRoutes } from '../modules/user/user.route';
import { MealRoutes } from '../modules/meal/meal.route';

const router = Router();

const apiPrefix = '/api';

const moduleRoutes = [
  {
    path: '/',
    route: HomeRoutes,
  },
  {
    path: `${apiPrefix}`,
    route: HomeRoutes,
  },
  {
    path: `${apiPrefix}/auth`,
    route: AuthRoutes,
  },
  {
    path: `${apiPrefix}/user`,
    route: UserRoutes,
  },
  {
    path: `${apiPrefix}/admin`,
    route: AdminRoutes,
  },
  {
    path: `${apiPrefix}/meals`,
    route: MealRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

moduleRoutes.forEach((moduleRoute) => {
  router.use(moduleRoute.path, moduleRoute.route);
});

export default router;
