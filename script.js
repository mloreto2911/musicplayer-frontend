

let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let seekBar = document.getElementById("seekSlider");
let currTime = document.getElementById("currentTime");
let songDuration = document.getElementById("totalDuration");
let curr_track= document.createElement("audio");



// Event Listeners

curr_track.addEventListener("timeupdate", songTimeUpdate)

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currTime;

}

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
        progress.value = song.currentTime;
    },500);
}

progress.onchange = function(){
    song.play();
    song.currTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}


// Timer

const musicPlayer = {
  seekBar: document.getElementById("seekSlider"),
  currTime: document.getElementById("currentTime"),
  songDuration: document.getElementById("totalDuration"),

  formatTime: (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  },

  setSeekerValue: (value) => {
    this.seekBar.value = value;
    this.currTime.textContent = this.formatTime(value);
  },

  init: function () {
    this.songDuration.textContent = "0:00";

    this.seekBar.addEventListener("input", () => {
      const value = parseInt(this.seekBar.value);
      this.currTime.textContent = this.formatTime(value);
    //   this.seekerBar.style.background = `linear-gradient(to right, black ${value}%, white ${value}%) no-repeat`;
    });
  },
};

musicPlayer.init();






// API Fetch


// Lyrics Fetch

const contentHolder = {
    lyrics: "",
    albums: "",
    artists: "",
    
};

function showContent(tab) {
    console.log(tab)
    // const contHolder = document.getElementsByClassName("content-holder")[0]; // Note the correction here (getElement**s**ByClassName)
    
    // for album
    const contentHolder = document.querySelector('.content-holder');
    // console.log({contHolder})
    const test = {
        text: "<p>TEST</p>"
    }
    if (tab === 'lyrics') {
        fetchLyrics();
    }
    if (tab === 'albums') {
        fetchAlbums();
    }    

    
}

// Lyrics API

async function fetchLyrics() {

    const url = 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=7076626';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '53071e078dmsh63019c0f7863f94p1e2e15jsne8127a51c4cf',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
      }
    };
  
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        console.log(result.lyrics.lyrics.body) 
    
        // Display the lyrics on the page
        const contentHolder = document.querySelector('.content-holder');
        contentHolder.innerHTML = result.lyrics.lyrics.body.html;
      } catch (error) {
        console.error(error);
      }
}

    // Albums API

    async function fetchData() {
        const url = 'https://spotify23.p.rapidapi.com/artist_albums/?id=06HL4z0CvFAxyc27GXpf02&offset=0&limit=25';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '53071e078dmsh63019c0f7863f94p1e2e15jsne8127a51c4cf',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };
    
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            fetchAlbums(data);
        } catch (error) {
            console.error(error);
        }
    }
    
    function fetchAlbums(data) {
        const contentHolder = document.querySelector('.content-holder');
        const items = albums.data.artist.discography.albums.items.release.items;
    
        let html = '';
    
        for (const item of items) {
            for (const release of item.releases.items) {
                const coverArtUrl = release.coverArt.sources[0].url;
                const name = release.name;
                const year = release.date.year;
    
                html += `
                    <div>
                        <img src="${coverArtUrl}" alt="${name}">
                        <h3>${name}</h3>
                        <p>${year}</p>
                    </div>
                `;
            }
        }
    
        contentHolder.innerHTML = html;
    }
    // Artist API







// Call fetchLyrics function somewhere in your code to fetch the lyrics.




