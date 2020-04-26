import { Router } from "express";
import userRouter from "./user";

export default () => {
  const app = Router();

  userRouter(app);
  return app;
};
