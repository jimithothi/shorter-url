import { Request, Response } from 'express';
import { Url } from '../models/url.model';
import { nanoid } from 'nanoid';
import { RequestWithUser } from '../interface/common.interface';


export const createShortUrl = async (req: RequestWithUser, res: Response) => {
  try {
    const { originalUrl } = req.body;
    const shortUrl = nanoid(10);
    const url = new Url({
      originalUrl,
      shortUrl,
      userId: req.user._id
    });
    await url.save();
    res.status(201).json(url);
  } catch (error) {
    res.status(500).json({ error: 'Error creating short URL' });
  }
};

export const getUserUrls = async (req: RequestWithUser, res: Response) => {
  try {
    const urls = await Url.find({ userId: req.user._id });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching URLs' });
  }
};

export const getUrlAnalytics = async (req: RequestWithUser, res: Response) => {
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
};

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
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
}; 