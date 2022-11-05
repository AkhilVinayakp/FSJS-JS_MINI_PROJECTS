let song_urls = [
    "https://dl.dropboxusercontent.com/s/ru7gps774eqwfzh/Elsei%20-%20Dreamer%20Radio%20%282%29.mp3?dl=0",
    "https://dl.dropboxusercontent.com/s/n9vwho3qekfmuwt/4.%20cxlt.%20-%20Far%20Away%20.mp3?dl=0",
    "https://dl.dropboxusercontent.com/s/877yjaidp4tpx8j/Lost%20Files%20-%20Behind%20The%20Hill.mp3?dl=0"
]

// controlls
const playpause = document.querySelector("#pp");
const lable = document.getElementById("lb");
const logElement = document.getElementById("vis");
const volumeCtrl = document.getElementById("volume-ctrl");
const volumelevelCtrl = document.getElementById("v-level");
const timeline = document.getElementById("timeline");
const timelineContainer = document.getElementById("t-container");
const current_time =  document.getElementById("current-t");


// variables
let currentGain;
let tempGain; // to store the previous gain value when muted
let buffer =  null;
let c_duration = null;
let runner = null; // setIntervel object : may deprecate in the later refactor.

// variable for controling the timeline view and time runner
let timelineRunner = 0; // update when the audio pause Event.


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
            audioContext.suspend().then(()=>logElement.textContent="suspended");
            clearInterval(runner);
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
    let duration = source.buffer.duration;
    console.log("buffer duration ", duration)
    duration = split_time(duration)
    duration = duration.toFixed(2);
    console.log("proccess duration ", duration)
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start();
    currentGain = gainNode.gain.value;
    // setTimeline(duration, source.buffer.duration); bug feature removed.
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

function setTimeline(duration, buffer_value){
    console.log("total duration ", duration)
    const total_time = document.getElementById("total-t");
    timelineContainer.classList.remove("hidden");
    let durationStr = String(duration).split('.');
    durationStr = durationStr.join(":");
    total_time.textContent = durationStr;
    c_duration = 0;
    let delta = 0;
    let min_duration = 0;
    runner = setInterval(()=>{
        c_duration = c_duration + 1
        delta += 1;
        if(c_duration == 60){
            c_duration = 0;
            min_duration += 1;
        }
        let c_duration_mins = Number(`${min_duration}.${c_duration}`)
        if(delta >= buffer_value){
            clearInterval(runner);
        }
        current_time.textContent = c_duration_mins.toFixed(2);
        // setting the timeline view
        let t_percent = (delta/buffer_value) * 100;
        t_percent = Math.round(t_percent);
        // logElement.textContent = `${delta}  upto ${buffer_value}  and ${t_percent}`
        timeline.setAttribute("value", t_percent)

    }, 1000);

}

// function setTimeline(duration, buffer_value){
//     console.log("total duration ", duration)
//     const total_time = document.getElementById("total-t");
//     const current_time =  document.getElementById("current-t");
//     timelineContainer.classList.remove("hidden");
//     let durationStr = String(duration).split('.');
//     durationStr = durationStr.join(":");
//     total_time.textContent = durationStr;
//     updateView(buffer_value);
// }

// function updateView(buffer_value, isPaused=false){
//     // current_time
//     //update the timeline and runner in UI
//     // suppport for pause and resume.
//     // NOTE: Logic update.
//     let delta; // runner variable local to match upto the value 
//     if(isPaused){
//         delta = timelineRunner;
//     }
//     else delta = 0;
//     while(delta< buffer_value){
//         delta += 1;
//         setTimeout(()=>{
//             // update the view in each second only.
//             let c_value = split_time(delta);
//             c_value = c_value.toFixed(2);
//             c_value = c_value.split(".");
//             current_time.textContent = c_value.join(':');
//             let t_percent = (delta/buffer_value) * 100;
//             t_percent = Math.round(t_percent)
//             timeline.setAttribute("value", t_percent);
//         },1000);
//     }

// }
function split_time(dtime){
    let mm = dtime%60;
    mm = Math.round(mm);
    mm = mm/100
    console.log(mm)
    dtime = Math.floor(dtime/60);
    console.log(dtime)
    dtime = dtime + mm;
    return dtime
}