let song_urls = [
    "https://dl.dropboxusercontent.com/s/ru7gps774eqwfzh/Elsei%20-%20Dreamer%20Radio%20%282%29.mp3?dl=0",
    "https://dl.dropboxusercontent.com/s/n9vwho3qekfmuwt/4.%20cxlt.%20-%20Far%20Away%20.mp3?dl=0",
    "https://dl.dropboxusercontent.com/s/877yjaidp4tpx8j/Lost%20Files%20-%20Behind%20The%20Hill.mp3?dl=0"
]

// controlls
const playpause = document.querySelector("#pp")
const lable = document.getElementById("lb");
const logElement = document.getElementById("vis");
const volumeCtrl = document.getElementById("volume-ctrl");
const volumelevelCtrl = document.getElementById("v-level");


// variables
let currentGain;
let tempGain; // to store the previous gain value when muted
let buffer =  null;

// testing
const audioContext = new AudioContext();
const source = audioContext.createBufferSource();
let gainNode = audioContext.createGain();

window.onload = main;


function main(){
    /**  
     * fetch the current song when initiated
     */
    if(!buffer){
       setBuffer();

    }
    gainNode.gain.value = 0.6;
    volumelevelCtrl.textContent = `60%`
    playpause.addEventListener("change", (event)=>{
        const target = event.target;
        let target_status = target.checked;
        if(target_status){
            // alert("checked");
            //start song
            if(source.buffer){
                audioContext.resume().then(()=>{
                    logElement.textContent = "resumed";
                })
            
            }
            else playSong();
        }
        else{
            audioContext.suspend().then(()=>logElement.textContent="suspended")
        }
        
    });
    volumeCtrl.addEventListener("change", ctrlVolume);
    volumelevelCtrl.addEventListener("wheel", event => {
        const delta = Math.sign(event.deltaY);
        if(delta==+1){
           gainNode.gain.value += 0.05;
           if(gainNode.gain.value >=1){
            gainNode.gain.value = 1;
           }
        }
        else gainNode.gain.value -= 0.05;
        if(gainNode.gain.value <= 0){
            gainNode.gain.value = 0;
        }
        currentGain = Math.round(gainNode.gain.value * 100);
        volumelevelCtrl.textContent = `${currentGain}%`
    });

}

function playSong(){
    /**
     * play the song from the current poition   
     * added gain node
     *  Chain: source -> gain -> Destination
     */

    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start();
    currentGain = gainNode.gain.value;
}


function setBuffer(){
    /**
     *   
     */
    const request = new XMLHttpRequest();
    try{
        request.open("Get", "./assets/song1.mp3");
        // changing the response type to array buffer.
        request.responseType = "arraybuffer";
        request.onload = function() {
            let undecodedAudio = request.response;
            audioContext.decodeAudioData(undecodedAudio, (decoded)=>{
                buffer = decoded;
                console.log("buffer load for current song")
            });
        }
        request.send();
    }
    catch(err){
        console.log("can not load audio file check the connection");
        console.log(err);
    }
}


function ctrlVolume(event){
    /**
     * mute and unmute the volume;  
     */
    let audio_status = event.target.checked;
    if(audio_status){
        // muted
        tempGain = gainNode.gain.value;
        gainNode.gain.value = 0;
        
    }
    else{
        //unmute
        if(tempGain){
            gainNode.gain.value = tempGain;
        }
        else gainNode.gain.value = 1;
    }
}

function gainAdjust(event){
    /**
     * control volume  
     */

}