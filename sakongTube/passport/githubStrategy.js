import User from "../models/User";
import GithubStrategy from "passport-github";
import dotenv from "dotenv";
import routes from "../routes";
dotenv.config();



export default (passport) => {
    console.log('github passport')
    passport.use(new GithubStrategy({
        clientID: process.env.GIT_ID,
        clientSecret: process.env.GIT_SECRET,
        callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
        async (accessToken, refreshToken, profile, cb) => {

            console.log("전략");
            const {
                _json: { id, avatar_url, name, email }
            } = profile;
            try {
                const user = await User.findOne({githubId:id});
                if (user) {
                    console.log('이미 이메일 가입되어있음')
                    //이미 같은 이메일로 가입되어있는경우  
                    user.githubId = id;
                    user.save();
                    return cb(null, user);
                }
                console.log('새로 가입')
                const newUser = await User.create({
                    email,
                    name,
                    githubId: id,
                    avatarUrl: avatar_url
                });
                return cb(null, newUser);
            } catch (error) {
                return cb(error);
            }

        }
    ))
}