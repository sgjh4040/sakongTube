import axios from "axios";

const likeIcon = document.getElementById("jsVideoLike");



const handleLike = async () => {
    if (likeIcon.classList.contains('liker')) {
        likeIcon.classList.remove('liker');
        likeIcon.classList.add('nonliker');
        alert("좋아요 취소ㅠㅠ");
    } else {
        likeIcon.classList.remove('nonliker');
        likeIcon.classList.add('liker');
        alert("좋아요!! 감사해용");
    }
    const videoId = window.location.href.split("/videos/")[1];
    await axios.get(`/videos/${videoId}/like`);
}

function init() {
    likeIcon.addEventListener("click", handleLike);
}


if (likeIcon) {
    init()
}




