
let selectedTag = null;
let canciones = null;
let audioTag = null;

let playerShowHide = false;

let devolverEnMinutos = ()=>{
  let duracion = audioTag.duration;
  console.log(duracion);
  
  let res = Math.round(duracion) / 60;
  let res_Int = Math.trunc( res );
  let res_Float = (res - res_Int) * 60;
  
  res = res_Int + ":" + (Math.round(res_Float) );
  console.log(res);

  return res;
}

let updateSongInfoInPlayer = ()=>{
  let songTitle = document.getElementById("songTitle");
  songTitle.innerHTML = selectedTag.textContent;

  document.getElementById("audio_track_duration").innerHTML = devolverEnMinutos();
}

let turnPauseAudio = ()=>{

  
  let turnPausePlayBtn = document.getElementById("pause-play");
  if(audioTag.paused){
    audioTag.play();
    turnPausePlayBtn.innerHTML = "Pause";
  }else {
    audioTag.pause();
    turnPausePlayBtn.innerHTML = "Play";
  }
}

function reproducir(texto){
    if(selectedTag){
        selectedTag.classList.remove('active');
    }

    texto.classList.add('active');
    document.getElementById('controles').innerHTML = `
      <div class="playerShow" >
        Reproduciendo...
        <h3 id="songTitle" >Title song</h3>
        <div>Circle</div>
      </div>
      <button id="togglePlayer" onClick="togglePlayer()">Show Hide player</button>
      <button > &#8810 </button>
      <button id="pause-play" onClick="turnPauseAudio()" > Pause </button>
      <audio src="musica/${texto.id}" id="audio_control" controls autoplay ></audio>
      <p id="audio_track_duration" >duracion</p>
      <button onclick="siguienteCancion()" > &#x226B </button>
    `;
    document.getElementsByTagName('title')[0].innerHTML = 'Spotify - ' + texto.id;
    selectedTag = texto; // Actualizo selectedTag con la nueva cancion
    canciones = document.getElementsByClassName('cancion');
    audioTag = document.getElementById('audio_control');
    audioTag.onended = ()=>{siguienteCancion();};
    document.getElementById('controles').classList.add("hide");

    setTimeout(200, updateSongInfoInPlayer() ); // Actualiza los datos luego de cargar la cancion
}

function siguienteCancion(){
    let nextSong = document.getElementById(selectedTag.id).nextElementSibling;

    if(selectedTag){
        selectedTag.classList.remove('active');
    }
    nextSong.classList.add('active');

    selectedTag = nextSong;

    nextSong = nextSong.id;
    document.getElementById('audio_control').src = 'musica/' + nextSong;
    document.getElementsByTagName('title')[0].innerHTML = 'Spotify - ' + nextSong;
    setTimeout(200, updateSongInfoInPlayer() );
}

function togglePlayer(){
  let controles = document.getElementById("controles");

  if(playerShowHide){
    playerShowHide = false;
    controles.classList.remove("show");
    controles.classList.add("hide");
  }else{
    playerShowHide = true;
    controles.classList.remove("hide");
    controles.classList.add("show");
  }

}
