import routes from "../routes";
import Video from "../models/Video"


//홈에서 비디오 불러오기
export const home = async (req, res) => {
    try {
        //최신순으로 정렬
        const videos = await Video.find({}).sort({_id:-1});
        console.log(videos);
        res.render("home", { pageTitle: "home", videos })
    } catch (err) {
        console.log(err);
        res.render("home", { pageTitle: "home", videos: [] })
    }

};
//검색기능
export const search =async (req, res) => {
    console.log(req.query);
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
//비디오 불러오기
export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path }
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    console.log('newVideo', newVideo)
    res.redirect(routes.videoDetail(newVideo.id))
    //비디오 업로드 및 저장

};
//비디오 상세화면
export const videoDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        console.log('video', video);
        res.render("videoDetail", { pageTitle: video.title,video })

    } catch (err) {
        console.log(err);
        res.redirect(routes.home);
    }


};
export const getEditVideo =async (req, res) => {
    const{
        params:{id}
    }=req;
    try{
        const video = await Video.findById(id);
        res.render("editVideo", { pageTitle: `Edit ${video.title}`,video });

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
        await Video.findByIdAndRemove(id);
        
    }catch(err){
        console.log(err)
    }
    res.redirect(routes.home);
    

};