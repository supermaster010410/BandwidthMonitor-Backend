import jwt from "jsonwebtoken";

import { ENV } from "@utils/constants";
import { NextFunction, Response } from "express";

export const authenticateToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(401).json({ message: "Access token not provided" });
    return;
  }

  jwt.verify(accessToken, ENV.JWT_SECRET, (err: any, user: any) => {
    if (err)
      res.status(403).json({ message: "Access token expired or invalid" });

    req.user = user;
    next();
  });
};
