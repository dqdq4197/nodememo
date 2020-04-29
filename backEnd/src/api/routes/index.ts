import { Router } from "express";
import usersRouter from "./users";
import postsRouter from "./posts";

export default () => {
  const app = Router();
  app.get("/", (req, res) => {
    res.send("api server");
  });
  usersRouter(app);
  postsRouter(app);
  return app;
};
