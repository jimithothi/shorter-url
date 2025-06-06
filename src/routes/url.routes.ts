import { Router, Request, Response, RequestHandler } from 'express';
import { body } from 'express-validator';
import { Url } from '../models/url.model';
import { validateRequest } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { nanoid } from 'nanoid';

interface RequestWithUser extends Request {
  user: {
    _id: string;
  };
}

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
  (async (req: RequestWithUser, res: Response) => {
    try {
      console.log('req.user===>', req.body);
      const { originalUrl } = req.body;
      const shortUrl = nanoid(10);

      const url = new Url({
        originalUrl,
        shortUrl,
        userId: req.user._id
      });
      console.log('url===>', {
        originalUrl,
        shortUrl,
        userId: req.user._id
      });
      await url.save();
      res.status(201).json(url);
    } catch (error) {
      console.log('error===>', error);
      res.status(500).json({ error: 'Error creating short URL' });
    }
  }) as unknown as RequestHandler
);

// Get all URLs for a user
router.get('/', authMiddleware, (async (req: RequestWithUser, res: Response) => {
  try {
    const urls = await Url.find({ userId: req.user._id });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching URLs' });
  }
}) as unknown as RequestHandler);

// Get URL analytics
router.get('/:shortUrl/analytics', authMiddleware, (async (req: RequestWithUser, res: Response) => {
  try {
    const url = await Url.findOne({
      shortUrl: req.params.shortUrl,
      userId: req.user._id
    });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json({
      clicks: url.clicks,
      createdAt: url.createdAt,
      lastAccessed: url.updatedAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching analytics' });
  }
}) as unknown as RequestHandler);

// Redirect to original URL
router.get('/:shortUrl', (async (req: Request, res: Response) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: 'Error redirecting to URL' });
  }
}) as unknown as RequestHandler);

export const urlRoutes = router; 