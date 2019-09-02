import express from "express";
import passport from "passport";
import routes from "../routes"
import {onlyPublic, onlyPrivate} from "../middlewares";
import { home, search } from "../controller/videoController";
import { getJoin, getLogin, logout, postJoin, postLogin, githubLogin, postGithubLogIn, kakaoLogin, postKakaoLogIn, getMe, facebookLogin, postFacebookLogIn } from "../controller/userController";

const globalRouter = express.Router();

//홈 페이지
globalRouter.get(routes.home,home)
//검색결과 페이지
globalRouter.get(routes.search,search)

//회원가입 페이지
globalRouter.get(routes.join,onlyPublic,getJoin)
//회원가입
globalRouter.post(routes.join,onlyPublic,postJoin,postLogin)

//로그인 페이지
globalRouter.get(routes.login,onlyPublic,getLogin)
//로그인
globalRouter.post(routes.login,onlyPublic,postLogin)

//로그아웃
globalRouter.get(routes.logout,onlyPrivate,logout)

//Github
globalRouter.get(routes.gitHub,githubLogin)
//Github callback
globalRouter.get(
    routes.githubCallback,
    passport.authenticate("github", { failureRedirect: "/login" }),postGithubLogIn);
//kakao
globalRouter.get(routes.kakao,kakaoLogin)
//kakao callback
globalRouter.get(
    routes.kakaoCallback,
    passport.authenticate("kakao",{failureRedirect:"/login"}),postKakaoLogIn)
//Facebook
globalRouter.get(routes.facebook,facebookLogin)
//facebook callback
globalRouter.get(
    routes.facebookCallback,
    passport.authenticate("facebook",{failureRedirect:"/login"}),postFacebookLogIn)

//프로필 페이지
globalRouter.get(routes.me,getMe)
export default globalRouter;

