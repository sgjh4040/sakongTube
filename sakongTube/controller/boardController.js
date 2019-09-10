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
        res.render("board", { pageTitle: "게시판", list,totalPage,paramPage});
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
        body: {content,title}
    }=req;
    console.log("content",content);
    try{
        const newBoard = await Board.create({
            writer:req.user._id,
            content,
            title
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
//게시글 삭제
export const boardDelete = async (req,res)=>{
    const{
        params:{id}
    }=req;
    try{
        const board = await Board.findByIdAndRemove(id);
        await User.findByIdAndUpdate(board.writer,{$pull:{boards:{$in:id}}});
        res.redirect(routes.board(1));
    }catch(err){
        console.log(err);
    }
}
//게시글 수정 페이지
export const getBoardEdit = async(req,res)=>{
    const{
        params:{id}
    }=req;
    try{
        const board = await Board.findById(id);
        res.render("editBoard", { pageTitle: board.title, board});
    }catch(err){
        res.redirect(routes.board(1));
    }
}
//게시글 수정
export const postBoardEdit = async(req,res)=>{
    const{
        params:{id},
        body:{title,content}
    }=req;
    try{
        await Board.findByIdAndUpdate(id,{title,content});
        res.redirect(routes.boardDetail(id));
    }catch(err){
        res.redirect(routes.board(1));
    }
}

//게시글 상세 불러오기
export const boardDetail = async (req,res)=>{
    const{
        params:{id}
    }=req;
    try{
        const board = await Board.findById(id).populate("writer");
        board.hits += 1;
        board.save();
        res.render("boardDetail", { pageTitle: board.title, board});

    }catch(err){
        res.redirect(routes.board(1));
    }
}


