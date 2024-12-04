//data of notes
const NOTE_DETAILS = [
  { note: "C", key: "Z", frequency: 261.626 },
  { note: "Db", key: "S", frequency: 277.183 },
  { note: "D", key: "X", frequency: 293.665 },
  { note: "Eb", key: "D", frequency: 311.127 },
  { note: "E", key: "C", frequency: 329.628 },
  { note: "F", key: "V", frequency: 349.228 },
  { note: "Gb", key: "G", frequency: 369.994 },
  { note: "G", key: "B", frequency: 391.995 },
  { note: "Ab", key: "H", frequency: 415.305 },
  { note: "A", key: "N", frequency: 440 },
  { note: "Bb", key: "J", frequency: 466.164 },
  { note: "B", key: "M", frequency: 493.883 },
];

//Creating a new NoteArray for handling empty divs (Where no black keys will be present)
let NEW_NOTE_DETAILS = [];
for (let i = 0; i < NOTE_DETAILS.length - 1; i++) {
  let j = i + 1;
  //
  NEW_NOTE_DETAILS.push(NOTE_DETAILS[i]);

  //if no black key between two white keys, then add an emptyKey in between.

  // necessary in order to style black keys on top of white keys better making the piano scalable and responsive.
  //Making the reletive notes stay together.
  if (NOTE_DETAILS[i].note.length === NOTE_DETAILS[j].note.length) {
    NEW_NOTE_DETAILS.push({ note: "Xx", key: "Xx", frequency: "Xx" });
  }
}
NEW_NOTE_DETAILS.push(NOTE_DETAILS[NOTE_DETAILS.length - 1]);
console.log("New modified NOTE_DETAILS", NEW_NOTE_DETAILS);

//Creating diffrenet arrays for white keys and blackKeys

//white keys
let whiteKeysArray = NEW_NOTE_DETAILS.filter((arr) => arr.note.length === 1);
console.log("Array of white keys", whiteKeysArray);

//black keys
let blackKeysArray = NEW_NOTE_DETAILS.filter((arr) => arr.note.length === 2);
console.log("Array of black keys", blackKeysArray);

//creating HTML elements based on data-notes

//An array to store the whiteKeyNote (Html) Elements that will be loaded/rendered in the DOM
let whiteKeyNoteElements = [];
console.log("Array of white elements: ", whiteKeyNoteElements);
//creating whitekeyNoteElements with their respective attributes
whiteKeysArray.forEach((item) => {
  whiteKeyNoteElements.push(createKeyNote(item.note, "white"));
});

//An array to store the blackKeyNote (Html) Elements that will be loaded/rendered in the DOM
let blackKeyNoteElements = [];
console.log("Array of black elements: ", blackKeyNoteElements);
//creating blackkeyNoteElements with their respective attributes
blackKeysArray.forEach((item) => {
  blackKeyNoteElements.push(createKeyNote(item.note, "black"));
});

//function for creating any type of keyNoteElement
function createKeyNote(noteValue, keyType) {
  const note = document.createElement("div");
  note.classList.add("key");
  note.classList.add(keyType);
  note.setAttribute("data-note", noteValue);
  if (noteValue === "Xx") {
    note.classList.add("emptyBlack");
  }
  return note;
}

//Getting the paino app
const pianoContainer = document.querySelector(".piano");
//creating whitekeys-container
const whiteKeysContainer = document.createElement("div");
whiteKeysContainer.classList.add("wk-container");

//creating blackkeys-container
const blackKeysContainer = document.createElement("div");
blackKeysContainer.classList.add("bk-container");
//loading the div elemts on UI
window.addEventListener("DOMContentLoaded", () => {
  pianoContainer.appendChild(whiteKeysContainer);
  whiteKeyNoteElements.forEach((element) => {
    whiteKeysContainer.appendChild(element);
  });
  pianoContainer.appendChild(blackKeysContainer);
  blackKeyNoteElements.forEach((element) => {
    blackKeysContainer.appendChild(element);
  });
});
