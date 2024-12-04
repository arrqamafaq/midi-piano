//data of notes
const NOTE_DETAILS = [
  { note: "C", key: "Z", frequency: 261.626, type: "natural" },
  { note: "Db", key: "S", frequency: 277.183, type: "accidental" },
  { note: "D", key: "X", frequency: 293.665, type: "natural" },
  { note: "Eb", key: "D", frequency: 311.127, type: "accidental" },
  { note: "E", key: "C", frequency: 329.628, type: "natural" },
  { note: "F", key: "V", frequency: 349.228, type: "natural" },
  { note: "Gb", key: "G", frequency: 369.994, type: "accidental" },
  { note: "G", key: "B", frequency: 391.995, type: "natural" },
  { note: "Ab", key: "H", frequency: 415.305, type: "accidental" },
  { note: "A", key: "N", frequency: 440, type: "natural" },
  { note: "Bb", key: "J", frequency: 466.164, type: "accidental" },
  { note: "B", key: "M", frequency: 493.883, type: "natural" },
];

//Creating a new NoteArray for handling empty divs (Where no accidental keys will be present)
let NEW_NOTE_DETAILS = [];
for (let i = 0; i < NOTE_DETAILS.length - 1; i++) {
  let j = i + 1;
  //
  NEW_NOTE_DETAILS.push(NOTE_DETAILS[i]);

  //if no accidental key between two natural keys, then add an emptyKey in between.

  // necessary in order to style accidental keys on top of natural keys better making the piano scalable and responsive.
  //Making the reletive notes stay together.
  if (NOTE_DETAILS[i].type === "natural" && NOTE_DETAILS[j].type === "natural") {
    NEW_NOTE_DETAILS.push({ note: "empty", key: "empty", frequency: "empty",type:"accidental" });
  }
}
NEW_NOTE_DETAILS.push(NOTE_DETAILS[NOTE_DETAILS.length - 1]);
console.log("New modified NOTE_DETAILS", NEW_NOTE_DETAILS);

//Creating diffrenet arrays for natural keys and blackKeys

//natural keys
let naturalKeysArray = NEW_NOTE_DETAILS.filter((arr) => arr.type === "natural");
console.log("Array of natural keys", naturalKeysArray);

//black keys
let accidentalKeysArray = NEW_NOTE_DETAILS.filter((arr) => arr.type === "accidental");
console.log("Array of accidental keys", accidentalKeysArray);

//creating HTML elements based on data-notes

//An array to store the whiteKeyNote (Html) Elements that will be loaded/rendered in the DOM
let naturalKeyNoteElements = [];
console.log("Array of natural elements: ", naturalKeyNoteElements);
//creating naturalkeyNoteElements with their respective attributes
naturalKeysArray.forEach((item) => {
  naturalKeyNoteElements.push(createKeyNote(item.note, item.type));
});

//An array to store the blackKeyNote (Html) Elements that will be loaded/rendered in the DOM
let accidentalKeyNoteElements = [];
console.log("Array of accidental elements: ", accidentalKeyNoteElements);
//creating accidentalkeyNoteElements with their respective attributes
accidentalKeysArray.forEach((item) => {
  accidentalKeyNoteElements.push(createKeyNote(item.note, item.type));
});

//function for creating any type of keyNoteElement
function createKeyNote(noteValue, keyType) {
  const note = document.createElement("div");
  note.classList.add("key");
  note.classList.add(keyType);
  note.setAttribute("data-note", noteValue);
  if (noteValue === "empty") {
    note.classList.add("emptyBlack");
  }
  return note;
}

//Getting the paino app
const pianoContainer = document.querySelector(".piano");
//creating whitekeys-container
const naturalKeysContainer = document.createElement("div");
naturalKeysContainer.classList.add("wk-container");

//creating blackkeys-container
const accidentalKeysContainer = document.createElement("div");
accidentalKeysContainer.classList.add("bk-container");
//loading the div elemts on UI
window.addEventListener("DOMContentLoaded", () => {
  pianoContainer.appendChild(naturalKeysContainer);
  naturalKeyNoteElements.forEach((element) => {
    naturalKeysContainer.appendChild(element);
  });
  pianoContainer.appendChild(accidentalKeysContainer);
  accidentalKeyNoteElements.forEach((element) => {
    accidentalKeysContainer.appendChild(element);
  });
});
