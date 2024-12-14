import Logger from "@utils/logger";
import { Request, Response, NextFunction } from "express";

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
	if (res.headersSent) return next(error);
	Logger.error(error.message);
	res.status(500).send(error.message);
};

export default errorHandler;
