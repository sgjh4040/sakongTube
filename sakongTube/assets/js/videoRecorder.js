const recordContainer =document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event)=>{
    const {data: videoFile}=event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download="recorded.webm";
    document.body.appendChild(link);
    link.click();
    
}

const startRecoding = ()=>{
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable",handleVideoData);
    recordBtn.addEventListener("click",stopRecoding);
    ;
}
const stopRecoding = () =>{
    videoRecorder.stop();
    recordBtn.removeEventListener("click",stopRecoding);
    recordBtn.addEventListener('click',getVideo);
    recordBtn.innerHTML = "녹화 시작";
}

const getVideo= async()=>{
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720 },
            audio:true,
            video:true
        });
        videoPreview.srcObject = stream;
        videoPreview.muted=true;
        videoPreview.play();
        recordBtn.innerHTML = "녹화 종료";
        streamObject = stream
        startRecoding();


    }catch(err){
        recordBtn.innerHTML="녹화를 할수 없습니다."
    }finally{
        recordBtn.removeEventListener("click",getVideo);
    }
}


function init(){
    recordBtn.addEventListener('click',getVideo);
}

if(recordContainer){
    init();
}
