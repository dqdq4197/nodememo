import { Router, Request, Response } from "express";
import myRes from "./myResponse";
const router = Router();

export default (app: Router) => {
  app.use("/users", router);

  router.post("/register", async (req, res) => {
    res.status(200).json(myRes(true, "가입성공"));
  });
  router.post("/login", async (req, res) => {
    res.status(200).json(myRes(true, "로그인 성공"));
  });
  router.get("/account", async (req, res) => {
    res.status(200).json(myRes(true, "계정보기 성공"));
  });
  router.put("/account", async (req, res) => {
    res.status(200).json(myRes(true, "계정수정 성공"));
  });
};
