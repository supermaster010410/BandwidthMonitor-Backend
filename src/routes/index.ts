import { Router, Request, Response } from "express";
import { router as authRouter } from "./auth.routes";

const router = Router();

router.get("/", async (_: Request, res: Response) => {
  res.send("Server is healthy.");
});
router.use("/auth", authRouter);

export default router;
