const musicContainer = document.querySelector('.music-container');
const musicInfo = document.querySelector('.music-info');
const  playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progressContainer = document.querySelector('.progress-container');
const progressContainerDiv = document.querySelector('.progress-container div');
const progress = document.querySelector('.progress');
const title = document.querySelector('#title');
const cover = document.querySelector('#img');
const time = document.querySelector('.time');
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');




const songs = ['Hey', 'Summer','Ukulele' ]

let songIndex = 0;





function loadSong(song){
    title.textContent = song;
    audio.src = `./${song}.mp3`;
    cover.src = `./${song}.jpg`;
}


function playSong(){
    if(playBtn.querySelector('i').classList.contains('fa-play')){
        audio.play();

        setInterval(timeleft ,1000)
        playBtn.querySelector('i').classList.remove('fa-play');
        playBtn.querySelector('i').classList.add('fa-pause');

    }else if(playBtn.querySelector('i').classList.contains('fa-pause')){
        playBtn.querySelector('i').classList.add('fa-play');
        playBtn.querySelector('i').classList.remove('fa-pause');
        audio.pause()
    }
}


playBtn.addEventListener('click', ()=>{
    playSong();
})



function next(){
    songIndex++

    if(songIndex > 2){
        songIndex = 0
    }

    loadSong(songs[songIndex])
    audio.play()
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');
}

nextBtn.addEventListener('click',next);


prevBtn.addEventListener('click',()=>{
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length-1;
    }

    loadSong(songs[songIndex])
    audio.play()
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');

})


audio.addEventListener('timeupdate', (e)=>{
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;

    progress.style.width = `${(currentTime/duration)*100}%`;

    document.addEventListener('click', (e)=>{
        if(e.target === nextBtn || e.target === prevBtn){
            progress.style.width = 0;
        }
    })

    
})



document.addEventListener('DOMContentLoaded', ()=>{
    loadSong(songs[0])
})



function nextSong(){
    songIndex++
    if(songIndex > 2){
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
    
}


audio.addEventListener('ended', next);


function setProgress(e){
 
    const duration = audio.duration;
    const width = this.clientWidth;
    const clickX = e.offsetX;

    audio.currentTime = (clickX/width)* Math.round(duration);
}

progressContainerDiv.addEventListener('click', setProgress);



function timeleft(){
    
    time.style.top = '5px';

    let remain = audio.duration - audio.currentTime;

    if(remain > 60){
        min.textContent = Math.floor(remain/60);
        sec.textContent = Math.round(remain%60);

        if(sec.textContent < 10){
            sec.textContent = `0${Math.round(remain%60)}`
        }
    }
    else{
        min.textContent = 0;
        sec.textContent = Math.round(remain);
        if(sec.textContent < 10){
            sec.textContent = `0${Math.round(remain)}`
        }
    }
}

