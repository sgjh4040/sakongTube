import User from "../models/User";
import KakaoStrategy from "passport-kakao";
import dotenv from "dotenv";
dotenv.config();

export default (passport) => {
  console.log('kakao passport')
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, cb) => {
    console.log('카카오 profile', profile)
    const { id,
            displayName,
            _json:{
                kaccount_email,
                properties:{
                  profile_image
                }} } = profile;
    try {
      const user = await User.findOne({email: kaccount_email});
      if (user) {
        console.log('이미 이메일 가입되어있음')
        //이미 같은 이메일로 가입되어있는경우
        user.kakaoId = id;
        user.save();
        return cb(null, user);
      }
      console.log('새로 가입');
      const newUser = await User.create({
        email: kaccount_email,
        name: displayName,
        kakaoId: id,
        avatarUrl: profile_image
      });
      return cb(null, newUser);
    } catch (error) {
      return cb(error);
    }
  }
  ));


}