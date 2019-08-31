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
export const getMe = async (req,res) => {
    try{
        const user = await User.findById(req.user._id);
        console.log('user',user);
        res.render("userDetail", { pageTitle: "사용자 상세",user });
    }catch(err){
        res.redirect(routes.home);
    }

}

export const userDetail = async (req, res) => {
    const {params:{id}}=req;
    try{
        const user = await User.findById(id).populate("videos");
        console.log("user",user);
        res.render("userDetail", { pageTitle: "상세 정보", user })

    }catch(err){
        res.redirect(routes.home);
    }
};
export const getEditProfile = (req, res) => res.render("editProfile", { pageTitle: "프로필 수정" });
export const postEditProfile = async (req,res) => {
    console.log(req.user._id);
    const{
        body:{name,email},
        file
    }=req;
    try{
        const a = await User.findByIdAndUpdate(req.user._id,{
            name,
            email,
            //수정할 아바타 url이 있을 경우 변경된 path, 없는 경우 기존 url 값 유지
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        console.log('결과:',a);
        res.redirect(routes.me);

    }catch(err){
        res.redirect(routes.editProfile);
    }
}

export const getChangePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req,res)=>{
    console.log('postChangePassword 진입')
    console.log(req.user);
    const {
        body:{oldPassword,newPassword,newPassword1}
    }=req;
    console.log(oldPassword);
    console.log(newPassword);
    console.log(newPassword1);
    try{
        if(newPassword !== newPassword1){
            console.log('비밀번호 일치하지 않음')
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        console.log('비번변경실행');
        const user = await User.findById(req.user._id);
        await user.changePassword(oldPassword,newPassword);
        res.redirect(routes.me);

    }catch(err){
        console.log('에러',err);
        res.status(400);
        res.redirect(`/users${routes.changePassword}`);
    }
}