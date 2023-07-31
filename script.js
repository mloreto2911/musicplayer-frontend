let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let seekSlider = document.querySelector(".seekSlider");
let currTime = document.querySelector(".currentTime");
let totalDuration = document.querySelector(".totalDuration");

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}

// CONTROL BUTTONS
function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
    else{
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime
    },500);
}

progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}



song.addEventListener('timeupdate', () => {
    let currentTime = song.currentTime;
    let duration = song.duration;

    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if (currentSeconds < 10) {
        currentSeconds = '0' + currentSeconds;
    }
    if (durationSeconds < 10) {
        durationSeconds = '0' + durationSeconds;
    }

    currTime.textContent = `${currentMinutes}:${currentSeconds}`;
    totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
});

