import { Router, Request, Response } from "express";

import { router as authRouter } from "./auth.routes";
import { router as clientRouter } from "./client.routes";
import { authenticateToken, authorizeRole } from "@middlewares/authentication";

const router = Router();

router.get("/", async (_: Request, res: Response) => {
  res.send("Server is healthy.");
});
router.use("/auth", authRouter);
router.use(
  "/clients",
  authenticateToken,
  authorizeRole(["admin"]),
  clientRouter
);

export default router;
