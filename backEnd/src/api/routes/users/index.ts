import { Router, Request, Response } from "express";
import UserService from "../../../services/UserService";

const router = Router();

export default (app: Router) => {
  app.use("/users", router);

  router.post("/register", async (req, res) => {
    await UserService.register();
    res.status(200).json({ success: true, message: "가입 성공" });
  });
  router.post("/login", async (req, res) => {
    await UserService.login();
    res.status(200).json({ success: true, message: "로그인 성공" });
  });
  router.get("/account", async (req, res) => {
    await UserService.account();
    res.status(200).json({ success: true, message: "내정보보기 성공" });
  });
  router.put("/account", async (req, res) => {
    await UserService.accountModify();
    res.status(200).json({ success: true, message: "내정보수정 성공" });
  });
  router.delete("/secession", async (req, res) => {
    await UserService.secession();
    res.status(200).json({ success: true, message: "탈퇴 성공" });
  });
};
