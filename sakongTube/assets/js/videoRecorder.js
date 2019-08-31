const recordContainer =document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");


const startRecording= async()=>{
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


    }catch(err){
        recordBtn.innerHTML="녹화를 할수 없습니다."
        recordBtn.removeEventListener("click",startRecording);
    }
}


function init(){
    recordBtn.addEventListener('click',startRecording);
}

if(recordContainer){
    init();
}