import routes from "../routes";

export const getJoin = (req,res)=>{
    
    res.render("join", { pageTitle: "Join" })

};
export const postJoin = (req,res)=>{
    const {
        //form 으로 넘어온 데이터를 받는다.
        body: {name,email,password,password2}
    }=req;
    /*패스워드 일치 확인
    *불일치시 응답(400),다시 join 화면으로
    *일치시 home 페이지로 이동
    */
    if(password !== password2){
        res.status(400)
        res.render("join", { pageTitle: "Join" })
    }else{
        //
        res.redirect(routes.home);
    }
    
    
};
export const getLogin = (req,res)=>res.render("login", { pageTitle: "Login" });
export const postLogin = (req,res)=>{
        res.redirect(routes.home);
}
export const logout = (req,res)=>{
    //로그아웃 과정

    res.redirect(routes.home);

};
export const userDetail = (req,res)=>res.render("userDetail", { pageTitle: "Login" });
export const editProfile = (req,res)=>res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req,res)=>res.render("changePassword", { pageTitle: "Change Password" });