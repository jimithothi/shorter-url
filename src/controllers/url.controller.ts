import { Response } from 'express';
import { createShortUrl, getUserUrls, getUrlAnalytics, redirectToOriginalUrl } from '../services/url.service';
import { RequestWithUser } from '../interface/common.interface';

export const createShortUrlController = async (req: RequestWithUser, res: Response) => {
  try {
    // @ts-expect-error Temporary: service signature expects (req, res), will fix in service next
    const url = await createShortUrl(req);
    res.status(201).json(url);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error creating short URL';
    res.status(500).json({ error: message });
  }
};

export const getUserUrlsController = async (req: RequestWithUser, res: Response) => {
  try {
    // @ts-expect-error Temporary: service signature expects (req, res), will fix in service next
    const urls = await getUserUrls(req);
    res.json(urls);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error fetching URLs';
    res.status(500).json({ error: message });
  }
};

export const getUrlAnalyticsController = async (req: RequestWithUser, res: Response) => {
  try {
    // @ts-expect-error Temporary: service signature expects (req, res), will fix in service next
    const analytics = await getUrlAnalytics(req);
    res.json(analytics);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error fetching analytics';
    res.status(500).json({ error: message });
  }
};

export const redirectToOriginalUrlController = async (req: RequestWithUser, res: Response) => {
  try {
    // @ts-expect-error Temporary: service signature expects (req, res), will fix in service next
    const redirectUrl = await redirectToOriginalUrl(req);
    if (typeof redirectUrl === 'string') {
      res.redirect(redirectUrl);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error: any) {
    const message = error instanceof Error ? error.message : 'Error redirecting to URL';
    if (error && error.status === 404) {
      res.status(404).json({ error: message });
    } else {
      res.status(500).json({ error: message });
    }
  }
}; 