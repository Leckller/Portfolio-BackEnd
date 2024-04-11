require('dotenv').config()
import { NextFunction, Request, Response } from "express";

const key = process.env.SUPER_SECRET_PASSWORD_OMG;

const PasswordMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const password = req.headers.authorization;
  if (!password || password != key) { return res.status(401).json({ message: "Não autorizado." }) }
  next();
}

export default PasswordMiddleware;