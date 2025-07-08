import { Router, RequestHandler } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  createShortUrlController,
  getUserUrlsController,
  getUrlAnalyticsController,
  redirectToOriginalUrlController
} from '../controllers/url.controller';

const router = Router();

// Create short URL
router.post(
  '/',
  authMiddleware,
  [
    body('originalUrl')
      .isURL()
      .withMessage('Please provide a valid URL')
  ],
  validateRequest,
  createShortUrlController as unknown as RequestHandler
);

// Get all URLs for a user
router.get('/', authMiddleware, getUserUrlsController as unknown as RequestHandler);

// Get URL analytics
router.get('/:shortUrl/analytics', authMiddleware, getUrlAnalyticsController as unknown as RequestHandler);

// Redirect to original URL
router.get('/:shortUrl', redirectToOriginalUrlController as unknown as RequestHandler);

export const urlRoutes = router; 