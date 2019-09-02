import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const delteCommentBtn = document.getElementsByClassName("jsCommentDelete")
const commentNumber = document.getElementById("jsCommentNumber");


const decreaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML) - 1; 
}
const deleteComment = async (commentId) => {
    const comment = document.getElementById(commentId).parentElement;
    console.log("comment",comment);
    comment.remove();
    decreaseNumber();
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
const handelDeleteClick = (event) => {
    event.preventDefault();
    const commentId = event.target.id;
    delteSendComment(commentId);

}
function init() {
    for (let i of delteCommentBtn) {

        i.addEventListener("click", handelDeleteClick);
    }

}

if (addCommentForm) {
    init()
}