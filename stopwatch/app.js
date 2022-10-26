

const start_ =  document.getElementById("start_btn");
const reset_ = document.getElementById("reset_btn");
let h_time = 00;
let m_time = 00;
let s_time = 00;
let ms_time = 00;
const h_element = document.getElementById("h");
const m_element = document.getElementById("m");
const s_element = document.getElementById("s");
const ms_element = document.getElementById("ms");
const wrap_timer = document.querySelector(".timer");
let intervelid = undefined;
start_.addEventListener("click",(e)=>{
    if(e.target.textContent == "START"){
    wrap_timer.classList.add("timer_on");
    reset_.disabled = true;
    // wrap_timer.style.color = "red"
    start_.textContent = "STOP"
    // start the timer
    intervelid = setInterval(()=>{
            ms_time +=1;
            if(ms_time > 60){
                ms_time = 0;
                s_time += 1;
            }
            if(s_time > 60){
                s_time = 0;
                m_time += 1;
            }
            if(m_time > 60){
                m_time = 0;
                h_time += 1;
            }
            h_element.textContent = h_time >= 10 ? h_time : `0${h_time}`;
            m_element.textContent = m_time >= 10 ? m_time : `0${m_time}`;
            s_element.textContent = s_time >= 10 ? s_time : `0${s_time}`;
            ms_element.textContent = ms_time >= 10 ? ms_time : `0${ms_time}`;
        },10);
    }
    else{
        start_.textContent = "START";
        console.log("working")
        clearInterval(intervelid);
        wrap_timer.classList.remove("timer_on");
        reset_.disabled = false;
    }


})

reset_.addEventListener("click", ()=>{
    h_time = 00;
    m_time = 00;
    s_time = 00;
    ms_time = 00;
    h_element.textContent = `0${h_time}`;
    m_element.textContent = `0${m_time}`;
    s_element.textContent = `0${s_time}`;
    ms_element.textContent =   `0${ms_time}`;
})