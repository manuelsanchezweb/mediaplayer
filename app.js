let section = document.querySelector(".section");
let duration = document.querySelector("#duration");
let current = document.querySelector("#current");
let playPause = document.querySelector("#playPause");
let labelProd = document.querySelector("#isProdLabel");
let inputProd = document.querySelector("#isProd");
let thumbImg = document.querySelector(".thumb img");
let title = document.querySelector(".title1");

let timeCalculator = function (value) {
  minute = Math.floor(value / 60);
  second = Math.floor(value - minute * 60);

  if (second < 10) {
    second = "0" + second;
  }

  return minute + ":" + second;
};

//start wavesurfer object
let wavesurfer = WaveSurfer.create({
  container: "#wavesurfer",
  waveColor: "#c5c5c5",
  progressColor: "#fae001",
  height: 48,
  scrollParent: false,
  responsive: true,
});

//load audio file
wavesurfer.load("./songs/anymorning.mp3");

isProd?.addEventListener("click", () => {
  if (isProd.checked === true) {
    isProdLabel.innerText = "AFTER";
    section.classList.add("dark");
    wavesurfer.on("ready", function (e) {
      duration.textContent = timeCalculator(wavesurfer.getDuration());
    });
    wavesurfer.on("audioprocess", function (e) {
      current.textContent = timeCalculator(wavesurfer.getCurrentTime());
    });
    wavesurfer.on("seek", function (e) {
      current.textContent = timeCalculator(wavesurfer.getCurrentTime());
    });
    wavesurfer.load("./songs/onmymind.wav");
    thumbImg.src = "./thumbs/onmymind.png";
    title.innerText = "Keenan Back - On my mind";
    wavesurfer.playPause();
  } else {
    isProdLabel.innerText = "BEFORE";
    section.classList.remove("dark");
    wavesurfer.on("ready", function (e) {
      duration.textContent = timeCalculator(wavesurfer.getDuration());
    });
    wavesurfer.on("audioprocess", function (e) {
      current.textContent = timeCalculator(wavesurfer.getCurrentTime());
    });
    wavesurfer.on("seek", function (e) {
      current.textContent = timeCalculator(wavesurfer.getCurrentTime());
    });
    wavesurfer.load("./songs/anymorning.mp3");
    thumbImg.src = "./thumbs/anymorning.jpeg";
    title.innerText = "Keenan Back - Anymorning";
    wavesurfer.playPause();
  }
});

//play and pause a player
playPause.addEventListener("click", function (e) {
  wavesurfer.playPause();
});

//load audio duration on load
wavesurfer.on("ready", function (e) {
  duration.textContent = timeCalculator(wavesurfer.getDuration());
});

//get updated current time on play
wavesurfer.on("audioprocess", function (e) {
  current.textContent = timeCalculator(wavesurfer.getCurrentTime());
});

//change play button to pause on plying
wavesurfer.on("play", function (e) {
  playPause.classList.remove("fi-rr-play");
  playPause.classList.add("fi-rr-pause");
});

//change pause button to play on pause
wavesurfer.on("pause", function (e) {
  playPause.classList.add("fi-rr-play");
  playPause.classList.remove("fi-rr-pause");
});

//update current time on seek
wavesurfer.on("seek", function (e) {
  current.textContent = timeCalculator(wavesurfer.getCurrentTime());
});
