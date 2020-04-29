import { Router, Request, Response } from "express";
import test from "./test";
const router = Router();

export default (app: Router) => {
  app.use("/posts", router);
  router.get("/add", async (req, res) => {
    res.status(200).json({ success: true, message: "추가 성공" });
  });
  test(router);
};
