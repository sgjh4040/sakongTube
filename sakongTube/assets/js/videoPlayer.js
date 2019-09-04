import getBlobDuration from "get-blob-duration";
import axios from "axios";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFillScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const uploadButton = document.getElementById("upload");
const uploadContainer = document.getElementById("jsRecordContainer");
const file = document.getElementById("file");
const loading = document.getElementById("loading");
const loadPercent = document.getElementById("load-percent");

const uploadFile = async (event) => {
  console.log(file.files[0]);
  
  let form = new FormData();
  form.append("videoFile", file.files[0]);
  form.append('title', "aaaa");
  try {
    await axios.post(`/videos/upload`, form, {
      onUploadProgress: progressEvent => {
        loadPercent.parentElement.parentElement.classList.remove('hidden');
        loading.setAttribute("value", progressEvent.loaded);
        loading.setAttribute("max", progressEvent.total);
        loadPercent.innerHTML = `${Math.ceil(progressEvent.loaded / progressEvent.total * 100)}%`;
      }
    })
    loadPercent.parentElement.parentElement.classList.add('hidden');
    window.location = "/";

  } catch (err) {
    loadPercent.parentElement.parentElement.classList.add('hidden');
    window.location = "/video/upload";
  } finally{
    loadPercent.parentElement.parentElement.classList.add('hidden');
    window.location = "/video/upload";

  }
}


const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST"
  });
}
//플레이 버튼 이벤트
function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';

  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}
//볼륨 mute 이벤트
function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}
//비디오 화면 작게(브라우저에 따라서 if문)
function exitFullScreen() {
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.addEventListener("click", goFullScreen);
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
//비디오 화면 크게(브라우저에 따라서 if문)
function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
}



const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

async function setTotalTime() {
  const blob = await fetch(videoPlayer.src).then(response => response.blob());
  let duration = await getBlobDuration(blob);
  duration = Math.ceil(duration);
  const totalTimeString = formatDate(duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}
function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}
function handleDrag(event) {
  const { target: { value } } = event;
  videoPlayer.volume = value;
}

function init() {
  videoPlayer.volume = "0.5"
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);


}

if (videoContainer) {
  console.log("init");
  init();
}

if (uploadContainer) {
  uploadButton.addEventListener("click", uploadFile);
}