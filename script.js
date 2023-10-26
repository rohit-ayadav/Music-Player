console.log("Welcome to Stopify");

let songIndex = 0;
let audio_Element = new Audio('song//1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let currentTimeElement = document.getElementById('currentTime');
let totalDurationElement = document.getElementById('totalDuration');
let songs = [
    {
        songName: "Wo Chaandani Wo Raatein jawaan",
        filePath: "song//0.mp3",
        coverPath: "cover/0.jpeg",
    },
    {
        songName: "बड़े अच्छे लगते हैं",
        filePath: "song//1.mp3",
        coverPath: "cover//1.jpeg",
    },
    {
        songName: "Man Mast Magan || 2 States",
        filePath: "song//2.mp3",
        coverPath: "cover//2.png",
    },
    {
        songName: "Tukur Tukur Dekhte Ho Kya",
        filePath: "song//3.mp3",
        coverPath: "cover//3.jpeg",
    },
    {
        songName: "छू कर मेरे मन को किया तूने क्या इशारा",
        filePath: "song//4.mp3",
        coverPath: "cover//4.jpeg",
    },
    {
        songName: "Mere paas tum Rahat fateh ali khan",
        filePath: "song//5.mp3",
        coverPath: "cover//5.jpeg",
    },
    {
        songName: "एक लड़की को देखा तो ऐसा लगा",
        filePath: "song//6.mp3",
        coverPath: "cover//6.jpeg",
    },
    {
        songName: "Jalte Diye",
        filePath: "song//7.mp3",
        coverPath: "cover//7.jpeg",
    },
    {
        songName: "जिस दिन तेरी मेरी बात नहीं होती",
        filePath: "song//8.mp3",
        coverPath: "cover//8.jpeg",
    },
    {
        songName: "Tera Ban Jaunga",
        filePath: "song//9.mp3",
        coverPath: "cover//9.jpeg",
    },
];

function updateTimestamps() {
    songItems.forEach((element, i) => {
        const audio_Element = new Audio(songs[i].filePath);

        audio_Element.addEventListener('loadedmetadata', () => {
            const minutes = Math.floor(audio_Element.duration / 60);
            const seconds = Math.floor(audio_Element.duration % 60);
            const formattedDuration = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

            const timestampElement = element.getElementsByClassName("timeStamp")[0];
            if (timestampElement) {
                timestampElement.innerHTML = `${formattedDuration} <i id="${i}" class="far songItemPlay fas fa-1.5x fa-play-circle"></i>`;
            }
        });

        audio_Element.load();
    });
}

// Define a function to set up play button listeners
function setupPlayButtonListeners() {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.addEventListener('click', (e) => {
            console.log(e.target);
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            playSongAtIndex(songIndex);
        });
    });
}

// Call the function to update timestamps
updateTimestamps();

// Call the function to set up play button listeners
setupPlayButtonListeners();



songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

    let audio_Element = new Audio(songs[i].filePath);


    audio_Element.addEventListener('loadedmetadata', () => {

        const minutes = Math.floor(audio_Element.duration / 60);
        const seconds = Math.floor(audio_Element.duration % 60);

        const formattedDuration = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

        const timestampElement = element.getElementsByClassName("timeStamp")[0];
        if (timestampElement) {
            timestampElement.innerHTML = `${formattedDuration} <i id="${i}" class="far songItemPlay fas fa-1.5x fa-play-circle"></i>`;
        }

    });
});

// });
// let audio_Element = new Audio('1.mp3');

// audio_Element.play();


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audio_Element.paused || audio_Element.currentTime <= 0) {
        playSongAtIndex(songIndex);
    } else {
        pauseSong();
    }
});


audio_Element.addEventListener('timeupdate', () => {
    progress = parseFloat((audio_Element.currentTime / audio_Element.duration) * 100)
    myProgressBar.value = progress;
    updateProgressBarColor(progress);
})
function updateProgressBarColor() {
    const progress = parseFloat(myProgressBar.value);

    myProgressBar.style.background = `linear-gradient(to right, #4285f4 ${progress}%, #FFFFFF ${progress}%)`;


    myProgressBar.style.setProperty('--thumb-color', '#4285f4');
}



//A code by chatgpt || progress bar se seedhe gana badhane ke liye
//------------------------------
myProgressBar.addEventListener('click', (event) => {
    // Calculate the position of the click relative to the left edge of the progress bar
    const clickPosition = event.clientX - myProgressBar.getBoundingClientRect().left;

    // Calculate the percentage of the click position relative to the total width of the progress bar
    const percentage = (clickPosition / myProgressBar.clientWidth) * 100;

    // Set the audio playback time based on the calculated percentage
    audio_Element.currentTime = (percentage * audio_Element.duration) / 100;
});
//-----------------------------------------------

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add("fa-play-circle");
    });
}
/*
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        playSongAtIndex(songIndex);
    })
});*/


document.getElementById('next').addEventListener('click', () => {
    playNextSong();
});

document.getElementById('previous').addEventListener('click', () => {
    playPreviousSong();
});
document.getElementById('backward').addEventListener('click', seekBack);
document.getElementById('forward').addEventListener('click', seekForward);

// function playNextSong() {
//     songIndex = (songIndex + 1) % songs.length;
//     playSongAtIndex(songIndex);
// }

// function playPreviousSong() {
//     if (shuffleMode)
//         songIndex = Math.floor(Math.random() * songs.length);
//     else
//         songIndex = (songIndex - 1 + songs.length) % songs.length;
//     playSongAtIndex(songIndex);
// }
function pauseSong() {
    audio_Element.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
}
function seekBack() {
    if (audio_Element.readyState > 0) {
        let newTime = audio_Element.currentTime - 10;
        if (newTime < 0)
            newTime = 0;
        audio_Element.currentTime = newTime;
    }

}
function seekForward() {
    if (audio_Element.readyState > 0) {
        let newTime = audio_Element.currentTime + 10;
        audio_Element.currentTime = newTime;
    }

}
function playSongAtIndex(index) {
    audio_Element.src = `song//${index}.mp3`;
    console.log('Play song at index:', index);
    masterSongName.innerHTML = ` <i class="fas fa-music"></i> ${songs[index].songName}`;
    audio_Element.currentTime = 0;
    audio_Element.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

audio_Element.addEventListener('ended', () => {
    if (shuffleMode)
        playSongAtIndex(songIndex);
    else
        playNextSong();
});

audio_Element.addEventListener('error', function () {
    console.error('Error loading ' + songs[songIndex].songName + ':', event);
    alert("We can't open the file " + songs[songIndex].songName + " because it's corrupted or an error occurred.");
    playNextSong();
});

audio_Element.addEventListener('timeupdate', () => {
    const currentTime = formatTime(audio_Element.currentTime);
    const totalDuration = formatTime(audio_Element.duration);


    currentTimeElement.innerText = currentTime;
    totalDurationElement.innerText = totalDuration;
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    return formattedMinutes + ':' + formattedSeconds;
}



let shuffleMode = false;
document.getElementById('shuffle').addEventListener('click', shuffleSong);

function shuffleSong() {
    shuffleMode = !shuffleMode;
    if (shuffleMode) {
        // shuffle.style.backgroundColor = '#4caf50';
        shuffle.style.color = '#fff';
    } else {
        shuffle.style.backgroundColor = 'transparent';
        shuffle.style.color = '#f9dcdcc9';
    }
}

audio_Element.volume = 0.6;
updateVolumeSlider();
document.getElementById('volumeDown').addEventListener('click', () => {
    updateVolumeSlider();
    audio_Element.volume = Math.max(audio_Element.volume - 0.1, 0);
    updateVolumeSlider();
})
document.getElementById('volumeUp').addEventListener('click', () => {
    audio_Element.volume = Math.min(audio_Element.volume + 0.1, 1);
    updateVolumeSlider();
})
const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.addEventListener('input', () => {
    audio_Element.volume = volumeSlider.value / 100;
    updateVolumeSlider();
});
function updateVolumeSlider() {
    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider.value = audio_Element.volume * 100;
}
let repeatMode = false;
document.getElementById('repeat').addEventListener('click', repeatSong);

function repeatSong() {
    repeatMode = !repeatMode;
    if (repeatMode) {
        repeat.style.color = '#fff';
    } else {
        repeat.style.backgroundColor = 'transparent';
        repeat.style.color = '#f9dcdcc9';
    }
}

function playNextSong() {
    if (shuffleMode)
        songIndex = Math.floor(Math.random() * songs.length);
    else if (repeatMode)
        songIndex = songIndex;
    else
        songIndex = (songIndex + 1) % songs.length;
    playSongAtIndex(songIndex);
}

function playPreviousSong() {
    if (shuffleMode)
        songIndex = Math.floor(Math.random() * songs.length);
    else if (repeatMode)
        songIndex = songIndex;
    else
        songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSongAtIndex(songIndex);
}

let darkMode = false;
document.getElementById('theme').addEventListener('click', () => {
    // document.body.classList.toggle("dark-mode");
    // document.body.classList.toggle("songItem");
    darkMode = !darkMode; toggleDark();
});
function toggleDark() {
    if (darkMode) {
        theme.style.color = 'red'; 
        document.body.classList.add("dark-mode");
    } else {
        theme.style.color = ''; 
        document.body.classList.remove("dark-mode");
    }
}