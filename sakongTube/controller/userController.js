import passport from "passport";
import routes from "../routes";
import User from "../models/User";
export const getJoin = (req, res) => {

    res.render("join", { pageTitle: "Join" })

};
export const postJoin = async (req, res, next) => {
    const {
        //form 으로 넘어온 데이터를 받는다.
        body: { name, email, password, password2 }
    } = req;
    /*패스워드 일치 확인
    *불일치시 응답(400),다시 join 화면으로
    *일치시 home 페이지로 이동
    */
    if (password !== password2) {
        res.status(400)
        res.render("join", { pageTitle: "Join" })
    } else {
        //회원 가입
        try {
            const user = User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch (err) {
            console.log(err);
            res.redirect(routes.home);
        }

    }


};
export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" });

//로그인 
export const postLogin = passport.authenticate('local', {
    //로그인 실패시 로그인 화면으로
    failureRedirect: routes.login,
    //로그인 성공시 홈으로 
    successRedirect: routes.home

});

//Github 로그인
export const githubLogin = passport.authenticate("github")

export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
  };
//kakao 로그인
export const kakaoLogin = passport.authenticate("kakao");
export const postKakaoLogIn = (req,res)=>{
  res.redirect(routes.home);
}
//facebook 로그인
export const facebookLogin = passport.authenticate("facebook");
export const postFacebookLogIn = (req,res)=>{
    res.redirect(routes.home);
}

//로그아웃
export const logout = (req, res) => {
    //로그아웃 과정
    req.logout();
    res.redirect(routes.home);

};
export const getMe = (req,res) => {
    res.render("userDetail", { pageTitle: "사용자 상세",user:req.user });
}

export const userDetail = async (req, res) => {
    const {params:{id}}=req;
    try{
        const user = await User.findById(id);
        res.render("userDetail", { pageTitle: "상세 정보", user })

    }catch(err){
        res.redirect(routes.home);
    }
};
export const getEditProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });