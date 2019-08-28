import { videos } from "../db";
import routes from "../routes";

export const home = (req,res)=>res.render("home",{pageTitle:"home",videos});

export const search = (req,res)=>{
    console.log(req.query);
    const {
        query:{term:searchingBy}} = req;
    res.render("search",{pageTitle:"Search",searchingBy,videos})

};

export const getUpload = (req,res)=>{
    
    res.render("upload",{pageTitle:"upload"})


};
export const postUpload = (req,res)=>{
    const {
        body:{file,title,description}
    }=req;
    //비디오 업로드 및 저장

    res.redirect(routes.videoDetail(324393))
};
export const videoDetail = (req,res)=>{
    
    res.render("videoDetail",{pageTitle:"Video Detail"})


};
export const editVideo = (req,res)=>{
    
    res.render("editVideo",{pageTitle:"Edit Video"})

};
export const deleteVideo = (req,res)=>{

    res.render("Delete Video",{pageTitle:"delteVideo"})

};