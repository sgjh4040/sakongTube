import routes from "../routes";
import Board from "../models/board";
import User from "../models/User";


//게시판 페이지 열기
export const getBoard =async (req,res)=>{
    const {
        params: {page}
    }= req;
    try{
        const paramPerPage=10;
        const paramPage=page;
        
        const totalPage = await Board.count();
        const list = await Board.find({}).populate('writer')
        .sort({'createdAt': -1})
        .limit(Number(paramPerPage))
        .skip(paramPerPage * (paramPage-1))
        console.log(list);
        res.render("board", { pageTitle: "게시판", list,totalPage });
    }catch(err){
        console.log(err);
    }
}
//글 작성 페이지
export const getWrite = async (req,res)=>{
    console.log("getWrite");
    res.render("writeBoard",{pageTitle:"게시글 작성"});
}

//게시판 글 작성
export const postWrite = async (req,res)=>{
    const {
        body: {content}
    }=req;
    console.log("content",content);
    try{
        const newBoard = await Board.create({
            writer:req.user._id,
            content
        });
        console.log('newBoard',newBoard);
        const user = await User.findById(req.user._id);
        console.log('user',user);
        user.boards.push(newBoard._id);
        user.save();
        res.redirect(routes.board(1));
        
    }catch(err){
        console.log(err);
    }

}
