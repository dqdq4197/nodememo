import { Router } from "express";
import usersRouter from "./users";
import postsRouter from "./posts";

export default () => {
  const app = Router();
  usersRouter(app);
  postsRouter(app);
  return app;
};
