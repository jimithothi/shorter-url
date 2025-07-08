import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';

export const registerUserController = async (req: Request, res: Response) => {
  try {
    // @ts-expect-error Temporary: service signature expects (req, res), will fix in service next
    const result = await registerUser(req);
    res.status(201).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error creating user';
    res.status(500).json({ error: message });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    // @ts-expect-error Temporary: service signature expects (req, res), will fix in service next
    const result = await loginUser(req);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error logging in';
    res.status(500).json({ error: message });
  }
}; 