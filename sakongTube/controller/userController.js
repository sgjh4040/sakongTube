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
        req.flash('error','비밀번호가 일치하지 않습니다.');
        res.status(400);
        res.render("join", { pageTitle: "Join" });
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
    successRedirect: routes.home,
    //flash
    successFlash: "SakongTube 에 오신것을 환영합니다!",
    failureFlash: "로그인을 하지 못했습니다. 이메일,패스워드를 확인해 주세요"

});

//Github 로그인
export const githubLogin = passport.authenticate("github")

export const postGithubLogIn = (req, res) => {
    req.flash('success','SakongTube 에 오신것을 환영합니다!');
    res.redirect(routes.home);
  };
//kakao 로그인
export const kakaoLogin = passport.authenticate("kakao",{
    successFlash: "sakongTube 에 오신것을 환영합니다!",
    failureFlash: "로그인을 하지 못했습니다."
});
export const postKakaoLogIn = (req,res)=>{
  res.redirect(routes.home);
}
//facebook 로그인
export const facebookLogin = passport.authenticate("facebook",{
    //flash
    successFlash: "sakongTube 에 오신것을 환영합니다!",
    failureFlash: "로그인을 하지 못했습니다."
});
export const postFacebookLogIn = (req,res)=>{
    res.redirect(routes.home);
}

//로그아웃
export const logout = (req, res) => {
    req.flash("info","로그아웃 되었습니다. 다음에 또 봐요!");
    //로그아웃 과정
    req.logout();
    res.redirect(routes.home);

};
export const getMe = async (req,res) => {
    try{
        const user = await User.findById(req.user._id).populate("videos");
        console.log(user);
        res.render("userDetail", { pageTitle: "사용자 상세",user });
    }catch(err){
        req.flash("error","사용자를 찾을수 없습니다.")
        res.redirect(routes.home);
    }

}

export const userDetail = async (req, res) => {
    const {params:{id}}=req;
    try{
        const user = await User.findById(id).populate("videos");
        console.log(user);
        res.render("userDetail", { pageTitle: "상세 정보", user })

    }catch(err){
        req.flash("error","존재하지 않는 사용자입니다.");
        res.redirect(routes.home);
    }
};
export const getEditProfile = (req, res) => res.render("editProfile", { pageTitle: "프로필 수정" });
export const postEditProfile = async (req,res) => {
    const{
        body:{name,email},
        file
    }=req;
    try{
        const user = await User.findByIdAndUpdate(req.user._id,{
            name,
            email,
            //수정할 아바타 url이 있을 경우 변경된 path, 없는 경우 기존 url 값 유지
            avatarUrl: file ? file.location : req.user.avatarUrl
        });
        req.user.avatarUrl = user.avatarUrl;
        req.flash("success","프로필을 업로드되었습니다.");
        res.redirect(routes.me);

    }catch(err){
        req.flash("error","프로필 업로드를 하지 못했습니다.")
        res.redirect(routes.editProfile);
    }
}

export const getChangePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req,res)=>{
    
    const {
        body:{oldPassword,newPassword,newPassword1}
    }=req;
    
    try{
        if(newPassword !== newPassword1){
            req.flash('error','비밀번호가 일치하지 않습니다.');
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        const user = await User.findById(req.user._id);
        await user.changePassword(oldPassword,newPassword);
        res.redirect(routes.me);

    }catch(err){
        req.flash('error','비밀번호를 변경하지 못했습니다.');
        res.status(400);
        res.redirect(`/users${routes.changePassword}`);
    }
}