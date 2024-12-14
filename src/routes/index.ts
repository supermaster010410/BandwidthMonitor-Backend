import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (_: Request, res: Response) => {
  res.send("Server is healthy.");
});

export default router;
