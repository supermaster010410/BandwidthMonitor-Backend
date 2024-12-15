import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";

import { comparePassword, generateToken, hashPassword } from "@utils/helper";
import { createNewUser, getUserByUsername } from "@services/user.services";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ENV,
  REFRESH_TOKEN_EXPIRES_IN,
} from "@utils/constants";
import { authenticateToken } from "@middlewares/authentication";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await getUserByUsername(username);
  if (!user) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }

  if (!user.isActive) {
    res.status(403).json({ message: "It's not an active user yet." });
    return;
  }

  const accessToken = generateToken(
    user.id,
    user.role,
    ENV.JWT_SECRET,
    ACCESS_TOKEN_EXPIRES_IN
  );
  const refreshToken = generateToken(
    user.id,
    user.role,
    ENV.JWT_REFRESH_SECRET,
    REFRESH_TOKEN_EXPIRES_IN
  );

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: ENV.MODE === "production",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: ENV.MODE === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: "Login successful" });
});

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await getUserByUsername(username);
  if (user) {
    res.status(401).json({ message: "User is already exist." });
    return;
  }

  await createNewUser(username, await hashPassword(password));

  res.json({ message: "Register successful" });
});

router.post("/logout", async (_: Request, res: Response) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error });
  }
});

router.post(
  "/refresh-token",
  authenticateToken,
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token not provided" });
      return;
    }

    // Verify the refresh token
    jwt.verify(
      refreshToken,
      ENV.JWT_REFRESH_SECRET,
      async (err: any, user: any) => {
        if (err) {
          res.status(403).json({ message: "Invalid refresh token" });
          return;
        }

        // Generate new access token
        const newAccessToken = generateToken(
          user.id,
          user.role,
          ENV.JWT_SECRET,
          ACCESS_TOKEN_EXPIRES_IN
        );

        // Update access token cookie
        res.cookie("access_token", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 15 * 60 * 1000,
        });

        res.json({ message: "Access token refreshed" });
      }
    );
  }
);

export { router };
