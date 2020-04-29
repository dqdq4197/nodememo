import { Router, Request, Response } from "express";

const router = Router();

export default (app: Router) => {
  app.use("/users", router);

  router.post("/register", async (req, res) => {
    res.status(200).json({ success: true, message: "가입 성공" });
  });
  router.post("/login", async (req, res) => {
    res.status(200).json({ success: true, message: "로그인 성공" });
  });
  router.get("/account", async (req, res) => {
    res.status(200).json({ success: true, message: "내정보보기 성공" });
  });
  router.put("/account", async (req, res) => {
    res.status(200).json({ success: true, message: "내정보수정 성공" });
  });
};
