console.log("Welcome to Stopify");
//initialise the variable
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
        songName: "बड़े अच्छे लगते हैं",
        filePath: "song//0.mp3",
        coverPath: "cover/0.jpeg",
    },
    {
        songName: "Jeene Laga Hoon",
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
        songName: "Pee Loon",
        filePath: "song//4.mp3",
        coverPath: "cover//4.jpeg",
    },
    {
        songName: "Tum Mile",
        filePath: "song//5.mp3",
        coverPath: "cover//5.jpeg",
    },
    {
        songName: "Raabta",
        filePath: "song//6.mp3",
        coverPath: "cover//6.jpeg",
    },
    {
        songName: "Tum Hi Aana",
        filePath: "song//7.mp3",
        coverPath: "cover//7.jpeg",
    },
    {
        songName: "Tum Mile Dil Khile",
        filePath: "song//8.mp3",
        coverPath: "cover//8.jpeg",
    },
    {
        songName: "Tera Ban Jaunga",
        filePath: "song//9.mp3",
        coverPath: "cover//9.jpeg",
    },
];
// Define a function to update timestamps
function updateTimestamps() {
    songItems.forEach((element, i) => {
        const audioElement = new Audio(songs[i].filePath);

        audioElement.addEventListener('loadedmetadata', () => {
            const minutes = Math.floor(audioElement.duration / 60);
            const seconds = Math.floor(audioElement.duration % 60);
            const formattedDuration = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

            const timestampElement = element.getElementsByClassName("timeStamp")[0];
            if (timestampElement) {
                timestampElement.innerHTML = `${formattedDuration} <i id="${i}" class="far songItemPlay fas fa-1.5x fa-play-circle"></i>`;
            }
        });

        // Make sure to load metadata to trigger the 'loadedmetadata' event
        audioElement.load();
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


// updateAllTimestamps();

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

// Call the function after updating timestamps
// setupPlayButtonListeners();


songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

    // let audioElement = new Audio(songs[i].filePath);

    // const playButtonIcon = document.createElement('i');
    // playButtonIcon.classList.add('fas', 'fa-1.5x', 'fa-play-circle');

    // audioElement.addEventListener('loadedmetadata', () => {

    //     const minutes = Math.floor(audioElement.duration / 60);
    //     const seconds = Math.floor(audioElement.duration % 60);

    //     const formattedDuration = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

    //     const timestampElement = element.getElementsByClassName("timeStamp")[0];
    //     if (timestampElement) {
    //         timestampElement.innerHTML = `${formattedDuration} <i id="${i}" class="far songItemPlay fas fa-1.5x fa-play-circle"></i>`;
    //     }

    // });
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

// You can call pauseSong() whenever you want to pause the audio from other parts of your code
// Example:
// pauseSong();

//Listen to events
audio_Element.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    //Update seekbar
    progress = parseFloat((audio_Element.currentTime / audio_Element.duration) * 100)
    // console.log(progress);
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

function playNextSong() {
    songIndex = (songIndex + 1) % songs.length;
    playSongAtIndex(songIndex);
}

function playPreviousSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSongAtIndex(songIndex);
}
function pauseSong() {
    audio_Element.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
}

function playSongAtIndex(index) {
    audio_Element.src = `song//${index}.mp3`;
    console.log('Play song at index:', index);
    masterSongName.innerText = `${songs[index].songName}`;
    audio_Element.currentTime = 0;
    audio_Element.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

audio_Element.addEventListener('ended', playNextSong);

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

const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.addEventListener('input', () => {
    audio_Element.volume = volumeSlider.value / 100;
});