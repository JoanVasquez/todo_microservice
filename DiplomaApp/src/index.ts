import "reflect-metadata";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./route/diploma.route";
import { errorHandler, ErrorModel } from "./middleware/exception.middleware";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next({ status: 404, message: "Not Found" } as ErrorModel);
});
app.use(errorHandler);

export default app;
