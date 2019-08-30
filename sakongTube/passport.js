import passport from "passport";
import User from "./models/User";
import dotenv from "dotenv";
dotenv.config();
import github from "./passport/githubStrategy";
import kakao from "./passport/kakaoStrategy";
import facebook from "./passport/facebookStrategy"

//local 패스포트 확인
passport.use(User.createStrategy());
//카카오 패스포트 확인
kakao(passport);
//깃허브 패스포트 확인
github(passport);
//페이스북 패스포트 확인
facebook(passport);



passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));