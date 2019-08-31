import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delteCommentBtn = document.getElementsByClassName("jsCommentDelete")

const inreaseNumber= ()=>{
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML)+1;
}

const addComment = (comment)=>{
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    li.appendChild(span);
    commentList.prepend(li);
    inreaseNumber();
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
        addComment(comment);
    }
}
const delteComment = async (commentId)=>{
    const videoId = window.location.href.split("/videos/")[1]
    try{
        const response=await axios({
            url:`/api/${videoId}/comment`,
            method:"delete",
            data:{
                commentId
            }
        });

    }catch(err){

    }
}
const handleSubmit = (event)=>{
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment =commentInput.value;
    sendComment(comment);
    commentInput.value="";
}
const handelDeleteClick = (event)=>{
    event.preventDefault();
    const commentId = event.path[0].querySelector("input").value;
    delteComment(commentId);

}

function init(){
    for(let i of delteCommentBtn){
       i.addEventListener("click",handelDeleteClick);
    }
    addCommentForm.addEventListener("submit",handleSubmit);
    
}

if (addCommentForm){
    init()
}