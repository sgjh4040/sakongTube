import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delteCommentBtn = document.getElementsByClassName("jsCommentDelete");
const editCommentInput = document.getElementById("editComment");
const editCommentBtn = document.getElementsByClassName("jsCommentEdit");
const editSaveBtn = document.getElementsByClassName("editSaveButton");


const inreaseNumber= ()=>{
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML)+1;
}
const decreaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML)-1; 
}

const addComment = (comment,commentId,writerUrl)=>{
    const div = document.createElement("div");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const i = document.createElement("i");
    const img = document.createElement("img");
    div.classList.add("comment-wrap");
    i.classList.add("fas");
    i.classList.add("fa-trash-alt");
    i.classList.add("jsCommentDelete");
    i.id=commentId;
    i.innerHTML = "삭제";
    i.addEventListener("click",handleDeleteClick);
    span.innerHTML = comment;
    img.src = writerUrl;
    li.appendChild(span);
    li.appendChild(i);
    div.appendChild(img);
    div.appendChild(li);
    commentList.prepend(div);
    
    inreaseNumber();
    
}
const deleteComment = async (commentId) => {
    const comment = document.getElementById(commentId).parentElement.parentElement;
    comment.remove();
    decreaseNumber();
}
const editComment = async (commentId,comment)=>{
    document.getElementById(commentId).parentElement.querySelector("span").innerHTML
    =comment
    document.getElementById(commentId).parentElement.querySelector("div").style.display="none";
    document.getElementById(commentId).parentElement.querySelector(".jsCommentEdit").addEventListener("click",showEditBox);
    document.getElementById(commentId).parentElement.querySelector(".jsCommentEdit").removeEventListener("click",shadeEditBox);
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
        const {
            data:{
                commentId,
                writerUrl
            }
        }=response;
        addComment(comment,commentId,writerUrl);
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
    if (response.status == 400) {
        
    }
}

const handleSubmit = (event)=>{
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment =commentInput.value;
    sendComment(comment);
    commentInput.value="";
}
const handleDeleteClick = (event) => {
    event.preventDefault();
    const commentId = event.target.id;
    delteSendComment(commentId);

}
const handleEditClick = (event)=>{
    event.preventDefault();
    const commentId = event.target.id;
    const commentInput = event.target.parentElement.querySelector("input").value;
    editSendComment(commentId,commentInput);
}
const shadeEditBox = (event)=>{
    const editbox = event.target.parentElement.querySelector("div");
    console.log(event.target.parentElement.querySelector("div"));
    editbox.style.display = "none";
    event.target.removeEventListener("click",shadeEditBox);
    event.target.addEventListener("click",showEditBox);
}
const showEditBox = (event)=>{
    const editbox = event.target.parentElement.querySelector("div");
    console.log(event.target);
    editbox.style.display = "block";
    event.target.removeEventListener("click",showEditBox);
    event.target.addEventListener("click",shadeEditBox);

}


function init(){
    for (let btn of delteCommentBtn) {
        btn.addEventListener("click", handleDeleteClick);
    }
    for (let btn of editCommentBtn){
        btn.addEventListener("click",showEditBox);
    }
    for (let btn of editSaveBtn){
        btn.addEventListener("click",handleEditClick);
    }
    addCommentForm.addEventListener("submit",handleSubmit);
    
}

if (addCommentForm){
    
    init()
}