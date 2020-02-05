let audio = document.createElement('audio');

let playlist = getAwesomePlaylist();
let index = 0;

function onPlayButtonClick() {
  playAudio();
}

function playAudio() {
  audio.src = playlist[index].src;
  audio.play()
  .then(_ => updateMetadata())
  .catch(error => log(error));
}

function updateMetadata() {
  let track = playlist[index];

  log('Playing ' + track.title + ' track...');
  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.title,
    title: track.artist
  });
}

/* Previous Track & Next Track */

navigator.mediaSession.setActionHandler('previoustrack', function() {
  log('> User clicked "Previous Track" icon.');
  index = (index - 1 + playlist.length) % playlist.length;
  playAudio();
});

navigator.mediaSession.setActionHandler('nexttrack', function() {
  log('> User clicked "Next Track" icon.');
  index = (index + 1) % playlist.length;
  playAudio();
});

audio.addEventListener('ended', function() {
  // Play automatically the next track when audio ends.
  index = (index - 1 + playlist.length) % playlist.length;
  playAudio();
});

/* Seek Backward & Seek Forward */

let defaultSkipTime = 15; /* Time to skip in seconds by default */

navigator.mediaSession.setActionHandler('seekbackward', function(event) {
  log('> User clicked "Seek Backward" icon.');
  const skipTime = event.seekOffset || defaultSkipTime;
  audio.currentTime = Math.max(audio.currentTime - skipTime, 0);
});

navigator.mediaSession.setActionHandler('seekforward', function(event) {
  log('> User clicked "Seek Forward" icon.');
  const skipTime = event.seekOffset || defaultSkipTime;
  audio.currentTime = Math.min(audio.currentTime + skipTime, audio.duration);
});

/* Play & Pause */

navigator.mediaSession.setActionHandler('play', function() {
  log('> User clicked "Play" icon.');
  audio.play();
  // Do something more than just playing audio...
});

navigator.mediaSession.setActionHandler('pause', function() {
  log('> User clicked "Pause" icon.');
  audio.pause();
  // Do something more than just pausing audio...
});

/* Stop (supported since Chrome 77) */

try {
  navigator.mediaSession.setActionHandler('stop', function() {
    log('> User clicked "Stop" icon.');
    // TODO: Clear UI playback...
  });
} catch(error) {
  log('Warning! The "stop" media session action is not supported.');
}

/* Seek To (supported since Chrome 78) */

try {
  navigator.mediaSession.setActionHandler('seekto', function(event) {
    log('> User clicked "Seek To" icon.');
    if (event.fastSeek && ('fastSeek' in audio)) {
      audio.fastSeek(event.seekTime);
      return;
    }
    audio.currentTime = event.seekTime;
  });
} catch(error) {
  log('Warning! The "seekto" media session action is not supported.');
}

/* Utils */

function getAwesomePlaylist() {
