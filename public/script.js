const white_keys = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const black_keys = ['s', 'd', 'g', 'h', 'j'];

const recordButton = document.querySelector('.record-button');
const playButton = document.querySelector('.play-button');
const saveButton = document.querySelector('.save-button');
const keys = document.querySelectorAll('.key');
const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');

const keyMap = [...keys].reduce((map, key) => {
  map[key.dataset.note] = key;
  return map
}, {})

let recordingStartTime; 
let songNotes;

keys.forEach(key => {
    key.addEventListener('click', () => playNote(key));
})


recordButton.addEventListener('click', toggleRecording)
saveButton.addEventListener('click', saveSong);
playButton.addEventListener('click', playSong)

document.addEventListener('keydown', e => {

    if (e.repeat) return;
    const key = e.key;
    const whiteKeyIndex = white_keys.indexOf(key);
    const blackKeyIndex = black_keys.indexOf(key);

    if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
    if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);



})

function toggleRecording() {
    recordButton.classList.toggle('active');
    if (isRecording()) {
        startRecording();
    } else {
        stopRecording();
    }
}

function isRecording() {
    return recordButton != null && recordButton.classList.contains('active');
}

function startRecording() {
    //everytime someone plays a note, we will mark what time note is plated + which note

    //get start time
    recordingStartTime = Date.now();
    // record song notes
    songNotes = [];
    playButton.classList.remove('show');
    saveButton.classList.remove('show');

}

function stopRecording() {
    playSong();
    playButton.classList.add('show');
    saveButton.classList.add('show');
}

function playSong() {

    //loop through song notes and play in time recorded
    if (songNotes.length === 0) return;
    songNotes.forEach( note => {
        setTimeout(() =>{
          playNote(keyMap[note.key])
        }, note.startTime)
    })
    
}

function playNote(key) {
    if (isRecording()) recordNote(key.dataset.note)
    const noteAudio = document.getElementById(key.dataset.note);
    noteAudio.currentTime = 0;
    noteAudio.play();
    key.classList.add('active');

    noteAudio.addEventListener('ended', () => {
        key.classList.remove('active');
    })
}

function recordNote(note) {
    songNotes.push({
        key: note,
        startTime: Date.now() - recordingStartTime
    })
}

function saveSong() {

    //trigger database to save song 

}