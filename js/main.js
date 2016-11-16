var song = new Audio('gravityfalls.wav');
var bill = document.getElementById('bill');
bill.addEventListener('click', function() {
  if (song.paused) {
    song.play();
  } else {
    song.pause();
  }
});
