import { Router, Request, Response } from "express";

const router = Router();

export default (app: Router) => {
  app.use("/test", router);

  router.get("/tester", async (req, res) => {
    res.status(200).json({ success: true, message: "tester 성공" });
  });
};
