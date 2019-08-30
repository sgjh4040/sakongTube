import User from "../models/User";
import FacebookStrategy from "passport-facebook";
import routes from "../routes";
import dotenv from "dotenv";
dotenv.config();

export default (passport)=>{
    console.log('facebook passport')
    passport.use(new FacebookStrategy({
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: `http://localhost:${process.env.PORT}${routes.facebookCallback}`
      },async (accessToken, refreshToken, profile, cb)=>{
          console.log("facebook 프로파일",profile);
        //   const{id,displayName,profileUrl}=profile
        //   try{
        //       const user = await User.findOne()
        //   }catch(err){
        //       console.log(err);
        //   }
      }))

}