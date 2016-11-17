var song = new Audio('gravityfalls.wav');
var bill = document.getElementById('bill');
bill.addEventListener('click', function() {
  if (song.paused) {
    bill.style.opacity = '1';
    song.play();
  } else {
    bill.style.opacity = '0';
    song.pause();
  }
});

bill.addEventListener('mouseenter', function() {
  bill.style.opacity = '1';
})

bill.addEventListener('mouseleave', function() {
  if (song.paused) {
    bill.style.opacity = '0';
  }
})
