import axios from "axios";

const uploadContainer = document.getElementById("jsRecordContainer");
const uploadButton = document.getElementById("upload");
const file = document.getElementById("file");
const loading = document.getElementById("loading");
const loadPercent = document.getElementById("load-percent");
const videoTitle = document.getElementById("videoTitle");
const videoDescription = document.getElementById("videoDescription");

const uploadFile = async (event) => {
    console.log(file.files[0]);
    
    let form = new FormData();
    const title = videoTitle.value;
    const description = videoDescription.value;
    form.append("videoFile", file.files[0]);
    form.append("title", title);
    form.append("description",description);
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
      window.location = "/videos/upload";
    } finally{
      loadPercent.parentElement.parentElement.classList.add('hidden');
      window.location = "/videos/upload";
  
    }
  }

function init(){
    uploadButton.addEventListener("click", uploadFile);
}




if (uploadContainer) {
    init();
}