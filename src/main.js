const keys = document.querySelectorAll(".key"),
  note = document.querySelector(".nowplaying"),
  hints = document.querySelectorAll(".hints");

let played
let allKeys = ['a','w','s','e','d','f','t','g','y','h','u','j','k','o','l','p',';']

let addKeyDown = (e) => {
  if (e.key) {
    if (allKeys.includes(e.key.toLowerCase())) {
      played.push(e)
    }
  }
}

let startRecording = () => {
  played = []
  window.addEventListener('keydown', addKeyDown)
}

let stopRecording = (e) => {
  window.removeEventListener('keydown', addKeyDown)
}

let playRecording = () => {
  for (let i = 0; i < played.length; i++) {
    setTimeout(() => (playNote(played[i])), 1000 * i)
  }
}

function playNote(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!key) return;

  const keyNote = key.getAttribute("data-note");

  key.classList.add("playing");
  note.innerHTML = keyNote;
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

function hintsOn(e, index) {
  e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
}

hints.forEach(hintsOn);

keys.forEach(key => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playNote);

const { Path, Point } = paper;

const offset = 10;
const segments = 20;
const strokeWidth = 5;
const strokeColor = 'black';

const canvas = document.querySelector('.squig');
paper.setup(canvas);
const view = paper.view;

const path = new Path();
path.strokeColor = strokeColor;
path.strokeWidth = strokeWidth;
path.strokeCap = 'round';

for (let i = 0; i <= segments; i++) {
  let width = view.size.width - (offset * 1);
  path.add(new Point((i / segments * width + offset), view.size.height / 2));
}

path.onFrame = (e) => {
	for (var i = 0; i <= segments; i++) {
    let height = 10;
    let sinus = Math.sin(e.time * 3 + i);
		path.segments[i].point.y = sinus * height + 25;
    path.smooth({
      type: 'continuous'
    });
	}
}

paper.view.draw();
