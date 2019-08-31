import express from "express";
import routes from "../routes";
import { userDetail, getEditProfile, changePassword, postEditProfile, getChangePassword, postChangePassword } from "../controller/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

//프로필 수정 페이지
userRouter.get(routes.editProfile,onlyPrivate,getEditProfile);
//프로필 수정 (post): 로그인유무 middleware=> 아바타 이미지 업로드=>db 업데이트
userRouter.post(routes.editProfile,onlyPrivate,uploadAvatar,postEditProfile);

//비밀번호 변경
userRouter.get(routes.changePassword,onlyPrivate,getChangePassword);
userRouter.post(routes.changePassword,onlyPrivate,postChangePassword);
//회원 상세 페이지
userRouter.get(routes.userDetail(),onlyPrivate,userDetail);


export default userRouter