export const home = (req,res)=>res.render("home",{pageTitle:"home"});

export const search = (req,res)=>{
    console.log(req.query);
    const {
        query:{term:searchingBy}} = req;
    res.render("search",{pageTitle:"Search",searchingBy})

};
export const videos = (req,res)=>{
    
    res.send("videos",{pageTitle:"Videos"})


};
export const upload = (req,res)=>{
    
    res.send("upload",{pageTitle:"upload"})


};
export const videoDetail = (req,res)=>{
    
    res.send("videoDetail",{pageTitle:"Video Detail"})


};
export const editVideo = (req,res)=>{
    
    res.send("editVideo",{pageTitle:"Edit Video"})

};
export const deleteVideo = (req,res)=>{

    res.send("Delete Video",{pageTitle:"delteVideo"})

};