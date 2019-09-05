import routes from "../routes";
import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";


//홈에서 비디오 불러오기
export const home = async (req, res) => {
    try {
        //최신순으로 정렬
        const videos = await Video.find({}).sort({_id:-1});
        res.render("home", { pageTitle: "home", videos })
    } catch (err) {
        console.log(err);
        res.render("home", { pageTitle: "home", videos: [] })
    }

};
//검색기능
export const search =async (req, res) => {
    const {
        query: { term: searchingBy } } = req;
    let videos = [];
    try{
        videos = await Video.find({title:{$regex:searchingBy,$options:"i"}})
    }catch(err){
        console.log(err);
    }
    res.render("search", { pageTitle: "Search", searchingBy,videos})

};

//비디오 페이지 불러오기
export const getUpload = (req, res) => {

    res.render("upload", { pageTitle: "upload" })


};
//비디오 업로드
export const postUpload = async (req, res) => {
    try{
        const {
            body: { title, description },
            file: { location }
        } = req;
        const newVideo = await Video.create({
            creator: req.user._id,
            fileUrl: location,
            title,
            description
        });
        const user =await User.findOne({_id:req.user._id});
        user.videos.push(newVideo._id);
        user.save();
        res.redirect(routes.videoDetail(newVideo.id))

    }catch(err){
        console.log(err)
    }

};
//비디오 상세화면
export const videoDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id).populate('creator').populate({path:'comments',model:'Comment',populate:{path:'creator',model:'User'}});
        res.render("videoDetail", { pageTitle: video.title,video})

    } catch (err) {
        req.flash("error","존재하지 않는 비디오입니다!");
        res.redirect(routes.home);
    }


};
export const getEditVideo =async (req, res) => {
    const{
        params:{id}
    }=req;
    try{
        const video = await Video.findById(id);
        if(video.creator != req.user._id){
            throw Error();
        }else{
            res.render("editVideo", { pageTitle: `Edit ${video.title}`,video });
        }
        

    }catch(err){
        console.log(err);
        res.redirect(routes.home);
    }
    


};
export const postEditVideo =async (req,res)=>{
    const {
        params:{id},
        body:{title,description}
    }=req;
    try{
       await Video.findByIdAndUpdate(id,{title,description});
       res.redirect(routes.videoDetail(id));

    }catch(err){
        console.log(err);
    }
    
}

export const deleteVideo =async (req, res) => {
    const {
        params: {id}
    }= req;
    try{
        const video = await Video.findById(id);
        if(video.creator != req.user._id){
            throw Error();
        }else{
            await Video.findByIdAndRemove(id);
        }
        
        
    }catch(err){
        console.log(err)
    }
    res.redirect(routes.home);
    

};

//view count up!

export const postRegisterView = async(req,res)=>{
    const {
        params: {id}
    }= req;
    try{
        const video = await Video.findById(id);
        video.views +=1;
        video.save();
        res.status(200);

    }catch(err){
        res.status(400);
        res.end();
    }finally{
        res.end();
    }
}
//comment 추가

export const postAddComment = async(req,res)=>{
    const {
        params: {id},
        body:{comment},
        user
    }= req;
    

    try{
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: user._id,
        });
        const writer = await User.findById(user._id);
        video.comments.push(newComment._id);
        video.save();
        res.status(200).json({commentId:newComment._id,writerUrl:writer.avatarUrl});

    }catch(err){
        res.status(400);
    }finally{
        res.end()
    }

}

//comment 삭제

export const postdelteComment = async(req,res)=>{
    const {
        params: {id},
        body:{commentId},
    }= req;
    try{
        await Video.findByIdAndUpdate(id,{$pull:{comments:{$in:commentId}}});
        await Comment.findByIdAndRemove(commentId);

    }catch(err){
        console.log(err);
        res.status(400);
    }finally{
        res.end();
    }
}
//comment 수정

export const postEditComment = async(req,res)=>{
    const {
        params: {id},
        body:{commentId,comment},
    }=req;
    try{
        await Comment.findByIdAndUpdate(commentId,{text:comment});
    }catch(err){

    }finally{
        res.end();
    }

}