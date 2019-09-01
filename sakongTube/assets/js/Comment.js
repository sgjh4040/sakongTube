import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delteCommentBtn = document.getElementsByClassName("jsCommentDelete")
const editCommentInput = document.getElementById("editComment");
const editCommentBtn = document.getElementsByClassName("jsCommentEdit")


const inreaseNumber= ()=>{
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML)+1;
}
const decreaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML)-1; 
}

const addComment = (comment,commentId)=>{
    const li = document.createElement("li");
    const span = document.createElement("span");
    const i = document.createElement("i");
    i.classList.add("fas");
    i.classList.add("fa-trash-alt");
    i.classList.add("jsCommentDelete");
    i.id=commentId;
    i.innerHTML = "삭제";
    i.addEventListener("click",handelDeleteClick);
    span.innerHTML = comment;
    li.appendChild(span);
    li.appendChild(i);
    commentList.prepend(li);
    inreaseNumber();
}
const deleteComment = async (commentId) => {
    const comment = document.getElementById(commentId).parentElement;
    comment.remove();
    decreaseNumber();
}
const editComment = async (commentId,comment)=>{
    document.getElementById(commentId).parentElement.querySelector("span").innerHTML
    =comment
}

const sendComment =async (comment) =>{
    const videoId = window.location.href.split("/videos/")[1]
    const response=await axios({
        url:`/api/${videoId}/comment`,
        method:"POST",
        data:{
            comment
        }
    });
    if(response.status == 200){
        const commentId = response.data
        addComment(comment,commentId);
    }
}
const delteSendComment = async (commentId) => {
    const videoId = window.location.href.split("/videos/")[1]
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "DELETE",
        data: {
            commentId
        }
    });
    if (response.status == 200) {
        deleteComment(commentId);
    }
}
const editSendComment = async (commentId,comment)=>{
    const videoId = window.location.href.split("/videos/")[1]
    const response = await axios({
        url:`/api/${videoId}/comment`,
        method: "PATCH",
        data: {
            commentId,
            comment
        }
    });
    if (response.status == 200) {
        editComment(commentId,comment);
    }
}

const handleSubmit = (event)=>{
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment =commentInput.value;
    sendComment(comment);
    commentInput.value="";
}
const handelDeleteClick = (event) => {
    event.preventDefault();
    const commentId = event.target.id;
    delteSendComment(commentId);

}
const handelEditClick = (event)=>{
    event.preventDefault();
    const commentId = event.target.id;
    const commentInput = editCommentInput.value;
    editSendComment(commentId,commentInput);
}



function init(){
    for (let btn of delteCommentBtn) {

        btn.addEventListener("click", handelDeleteClick);
    }
    for (let btn of editCommentBtn){
        btn.addEventListener("click",handelEditClick);
    }
    addCommentForm.addEventListener("submit",handleSubmit);
    
}

if (addCommentForm){
    
    init()
}