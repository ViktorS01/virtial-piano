'use strict';

const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');
const screen = document.querySelector('.fullscreen');

function playAudio  (audio){
    audio.currentTime = 0;
    audio.play();
}

//события клавиатуры
window.addEventListener( 'keydown', function (e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.piano-key[data-key="${e.keyCode}"]`);
    if (!audio) return;
    playAudio(audio);
    key.classList.add('piano-key-active');
})

//обратное отлипание клавиш
function removeTransition (e){
    if (e.propertyName !== 'transform' ) return;
    this.classList.remove('piano-key-active');
}

//вызов функции отлипания у каждой клавиши
pianoКeys.forEach (key => key.addEventListener("transitionend", removeTransition));

//Зажатие мышки 
function onClick (event) {
    event.target.classList.add('piano-key-active');
    const audio = document.querySelector(`audio[data-key="${event.target.dataset.key}"]`);
    playAudio(audio);
}

//Отпускание мыши
function ofClick (event) {
    event.target.classList.remove('piano-key-active');
}

//Начало движения мыши
function startOver (event) {
    event.target.classList.add('piano-key-active');
    pianoКeys.forEach ((elem) => {
        elem.addEventListener('mouseover', onClick);
        elem.addEventListener('mouseout', ofClick);
    })
}

//Завершение движения
function stopOver () {
    event.target.classList.remove('piano-key-active');
    pianoКeys.forEach ((elem) => {
        elem.removeEventListener('mouseover', onClick);
        elem.removeEventListener('mouseout', ofClick);
    })
}

piano.addEventListener('mousedown', startOver, false);
piano.addEventListener('mouseup', stopOver);

piano.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('piano-key')){
        const audio = document.querySelector(`audio[data-key="${event.target.dataset.key}"]`);
        playAudio(audio);
    }
})

btnLetters.addEventListener('click', (e) => {
    e.target.classList.add('btn-active');
    btnNotes.classList.remove('btn-active');
    pianoКeys.forEach ((elem) => {
        elem.classList.add("piano-key-letter");
    })
})

btnNotes.addEventListener('click', (e) => {
    e.target.classList.add('btn-active');
    btnLetters.classList.remove('btn-active');
    pianoКeys.forEach ((elem) => {
        elem.classList.remove("piano-key-letter");
    })
})

screen.addEventListener ('click', toggleFullScreen);

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }