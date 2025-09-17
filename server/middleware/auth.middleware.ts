import { Request, Response, NextFunction } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!(req.session as any).user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}
