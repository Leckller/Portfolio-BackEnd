import { NextFunction, Request, Response } from "express";

const PasswordMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const password = req.headers.authorization;
  const key = process.env.SUPER_SECRET_PASSWORD_OMG;
  if (password != key) { return res.status(401).json({ message: "Não autorizado." }) }
  next();
}