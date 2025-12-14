let player = null;
let adPlaying = false;
let needsUnMute = false;

function doIt() {
  let e = document.getElementById("movie_player");
  if (e) {
    if (e.classList.contains("ad-showing")) {
      let p = e.getElementsByTagName("video")[0];
      if (!adPlaying) {
        adPlaying = true;
        needsUnMute = !p.muted;
        console.log("ad started; muted");
      }
      p.muted = true;
      p.style.filter = "blur(100px)";
    }
    else {
      if (adPlaying) {
        adPlaying = false;
        if (needsUnMute) {
          let p = e.getElementsByTagName("video")[0];
          p.muted = false;
          p.style.filter = null;
        }
        console.log("ad ended; unmuted");
      }
    }
  }
}

setInterval(doIt, 500);
doIt();
