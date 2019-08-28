import express from "express";
import routes from "../routes"
import { home, search } from "../controller/videoController";
import { getJoin, getLogin, logout, postJoin, postLogin } from "../controller/userController";

const globalRouter = express.Router();

globalRouter.get(routes.home,home)
globalRouter.get(routes.search,search)

//회원가입
globalRouter.get(routes.join,getJoin)
globalRouter.post(routes.join,postJoin)

//로그인
globalRouter.get(routes.login,getLogin)
globalRouter.post(routes.login,postLogin)

globalRouter.get(routes.logout,logout)


export default globalRouter;