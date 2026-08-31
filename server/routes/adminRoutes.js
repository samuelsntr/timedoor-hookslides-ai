import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth.js';

export function createAdminRoutes(controller) {
  const router = Router();

  // All routes below require admin authentication
  router.use('/admin', adminAuth);

  router.get('/admin/verify', controller.verify);
  router.get('/admin/stats', controller.getStats);
  router.get('/admin/users', controller.getUsers);
  router.get('/admin/users/:id', controller.getUserById);
  router.get('/admin/carousels', controller.getCarousels);
  router.get('/admin/carousels/:id', controller.getCarouselById);

  return router;
}
