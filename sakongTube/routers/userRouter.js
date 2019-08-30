import express from "express";
import routes from "../routes";
import { userDetail, getEditProfile, changePassword } from "../controller/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

//프로필 수정 페이지
userRouter.get(routes.editProfile,onlyPrivate,getEditProfile);
//회원 상세 페이지
userRouter.get(routes.userDetail(),onlyPrivate,userDetail);
//비밀번호 변경
userRouter.get(routes.changePassword,onlyPrivate,changePassword);

export default userRouter