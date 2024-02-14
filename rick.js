var scriptTag = document.createElement('script');
scriptTag.src = "https://www.youtube.com/player_api";
var fsTag = document.getElementsByTagName('script')[0];
fsTag.parentNode.insertBefore(scriptTag, fsTag);
let player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        height: '1080',
        width: '1920',
        videoId: 'dQw4w9WgXcQ',
        playerVars: {
          autohide: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0
        },
      events: {
        onReady: onPlayerReady
      }
    });
}

function visivbleit() {
  video = document.getElementById("player");
  video.style.display ="block";
  console.log("@hi");
}
function onPlayerReady(event) {
  let playButton = document.getElementById("eid");
  playButton.addEventListener("click", function () {
    player.playVideo();
    setTimeout(visivbleit, 1000);
  });
}