import {
  NOTE_DETAILS_32_KEYS as piano32key,
  NOTE_DETAILS_49_KEYS as piano49key,
  NOTE_DETAILS_61_KEYS as piano61key,
  NOTE_DETAILS_76_KEYS as piano76key,
  NOTE_DETAILS_88_KEYS as piano88key,
} from "./data.js";

//arrsy of availabel pianos
const availablePianos = [
  { id: "piano32key", details: piano32key },
  { id: "piano49key", details: piano49key },
  { id: "piano61key", details: piano61key },
  { id: "piano76key", details: piano76key },
  { id: "piano88key", details: piano88key },
];

//determining which piano has been selected
//by default 32key piano
let selectedPiano = "piano32key";
let NOTE_DETAILS = piano32key;

//function to handle which piano has been clicked
const pianoSelectionButtons = document.querySelector(".pianoSelection");
//using event delegation to handle events
pianoSelectionButtons.addEventListener("click", (e) => {
  const selectedPianoId = e.target.id;
  if (selectedPianoId === "piano32key") {
    selectedPiano = selectedPianoId;
    NOTE_DETAILS = noteDetails(selectedPiano, availablePianos);
    NEW_NOTE_DETAILS = newNoteDetails();
    pianoKeysArray();
    pianoKeyNoteElements();
    loadUI(selectedPiano);
  } else if (selectedPianoId === "piano49key") {
    selectedPiano = selectedPianoId;
    NOTE_DETAILS = noteDetails(selectedPiano, availablePianos);
    NEW_NOTE_DETAILS = newNoteDetails();
    pianoKeysArray();
    pianoKeyNoteElements();
    loadUI(selectedPiano);
  } else if (selectedPianoId === "piano61key") {
    selectedPiano = selectedPianoId;
    NOTE_DETAILS = noteDetails(selectedPiano, availablePianos);
    NEW_NOTE_DETAILS = newNoteDetails();
    pianoKeysArray();
    pianoKeyNoteElements();
    loadUI(selectedPiano);
  } else if (selectedPianoId === "piano76key") {
    selectedPiano = selectedPianoId;
    NOTE_DETAILS = noteDetails(selectedPiano, availablePianos);
    NEW_NOTE_DETAILS = newNoteDetails();
    pianoKeysArray();
    pianoKeyNoteElements();
    loadUI(selectedPiano);
  } else if (selectedPianoId === "piano88key") {
    selectedPiano = selectedPianoId;
    NOTE_DETAILS = noteDetails(selectedPiano, availablePianos);
    NEW_NOTE_DETAILS = newNoteDetails();
    pianoKeysArray();
    pianoKeyNoteElements();
    loadUI(selectedPiano);
  } else {
    console.log("no-event raised");
  }
  console.log("Selected_Piano", selectedPiano);
});

//note data to choose based on  selected piano
function noteDetails(selectedPiano, availablePianos) {
  availablePianos.forEach((piano) => {
    if (piano.id === selectedPiano) {
      NOTE_DETAILS = piano.details;
    } else {
      console.log("no match found");
    }
  });
  console.log("Note Details", NOTE_DETAILS);

  return NOTE_DETAILS;
}

//data of notes
// const NOTE_DETAILS = [
//   { note: "C", key: "Z", frequency: 261.626, type: "natural" },
//   { note: "Db", key: "S", frequency: 277.183, type: "accidental" },
//   { note: "D", key: "X", frequency: 293.665, type: "natural" },
//   { note: "Eb", key: "D", frequency: 311.127, type: "accidental" },
//   { note: "E", key: "C", frequency: 329.628, type: "natural" },
//   { note: "F", key: "V", frequency: 349.228, type: "natural" },
//   { note: "Gb", key: "G", frequency: 369.994, type: "accidental" },
//   { note: "G", key: "B", frequency: 391.995, type: "natural" },
//   { note: "Ab", key: "H", frequency: 415.305, type: "accidental" },
//   { note: "A", key: "N", frequency: 440, type: "natural" },
//   { note: "Bb", key: "J", frequency: 466.164, type: "accidental" },
//   { note: "B", key: "M", frequency: 493.883, type: "natural" },
// ];

// const NOTE_DETAILS = [
//   { note: "C2", key: "Z", frequency: 65.406, type: "natural", octave: 2, position: 1 },
//   { note: "Db2", key: "S", frequency: 69.296, type: "accidental", octave: 2, position: 2 },
//   { note: "D2", key: "X", frequency: 73.416, type: "natural", octave: 2, position: 3 },
//   { note: "Eb2", key: "D", frequency: 77.782, type: "accidental", octave: 2, position: 4 },
//   { note: "E2", key: "C", frequency: 82.407, type: "natural", octave: 2, position: 5 },
//   { note: "F2", key: "V", frequency: 87.307, type: "natural", octave: 2, position: 6 },
//   { note: "Gb2", key: "G", frequency: 92.499, type: "accidental", octave: 2, position: 7 },
//   { note: "G2", key: "B", frequency: 97.999, type: "natural", octave: 2, position: 8 },
//   { note: "Ab2", key: "H", frequency: 103.826, type: "accidental", octave: 2, position: 9 },
//   { note: "A2", key: "N", frequency: 110.000, type: "natural", octave: 2, position: 10 },
//   { note: "Bb2", key: "J", frequency: 116.541, type: "accidental", octave: 2, position: 11 },
//   { note: "B2", key: "M", frequency: 123.471, type: "natural", octave: 2, position: 12 },
//   { note: "C3", key: "Q", frequency: 130.813, type: "natural", octave: 3, position: 13 },
//   { note: "Db3", key: "2", frequency: 138.591, type: "accidental", octave: 3, position: 14 },
//   { note: "D3", key: "W", frequency: 146.832, type: "natural", octave: 3, position: 15 },
//   { note: "Eb3", key: "3", frequency: 155.563, type: "accidental", octave: 3, position: 16 },
//   { note: "E3", key: "E", frequency: 164.814, type: "natural", octave: 3, position: 17 },
//   { note: "F3", key: "R", frequency: 174.614, type: "natural", octave: 3, position: 18 },
//   { note: "Gb3", key: "5", frequency: 184.997, type: "accidental", octave: 3, position: 19 },
//   { note: "G3", key: "T", frequency: 195.998, type: "natural", octave: 3, position: 20 },
//   { note: "Ab3", key: "6", frequency: 207.652, type: "accidental", octave: 3, position: 21 },
//   { note: "A3", key: "Y", frequency: 220.000, type: "natural", octave: 3, position: 22 },
//   { note: "Bb3", key: "7", frequency: 233.082, type: "accidental", octave: 3, position: 23 },
//   { note: "B3", key: "U", frequency: 246.942, type: "natural", octave: 3, position: 24 },
//   { note: "C4", key: "I", frequency: 261.626, type: "natural", octave: 4, position: 25 },
//   { note: "Db4", key: "9", frequency: 277.183, type: "accidental", octave: 4, position: 26 },
//   { note: "D4", key: "O", frequency: 293.665, type: "natural", octave: 4, position: 27 },
//   { note: "Eb4", key: "0", frequency: 311.127, type: "accidental", octave: 4, position: 28 },
//   { note: "E4", key: "P", frequency: 329.628, type: "natural", octave: 4, position: 29 },
//   { note: "F4", key: "[", frequency: 349.228, type: "natural", octave: 4, position: 30 },
//   { note: "Gb4", key: "=", frequency: 369.994, type: "accidental", octave: 4, position: 31 },
//   { note: "G4", key: "]", frequency: 391.995, type: "natural", octave: 4, position: 32 }
// ];

//Creating a new NoteArray for handling empty divs (Where no accidental keys will be present)
let NEW_NOTE_DETAILS = [];
function newNoteDetails() {
  NEW_NOTE_DETAILS = []; //clear existing content
  for (let i = 0; i < NOTE_DETAILS.length - 1; i++) {
    let j = i + 1;
    //
    NEW_NOTE_DETAILS.push(NOTE_DETAILS[i]);

    //if no accidental key between two natural keys, then add an emptyKey in between.

    // necessary in order to style accidental keys on top of natural keys better making the piano scalable and responsive.
    //Making the reletive notes stay together.
    if (
      NOTE_DETAILS[i].type === "natural" &&
      NOTE_DETAILS[j].type === "natural"
    ) {
      NEW_NOTE_DETAILS.push({
        note: "empty",
        key: "empty",
        frequency: "empty",
        type: "accidental",
      });
    }
  }
  NEW_NOTE_DETAILS.push(NOTE_DETAILS[NOTE_DETAILS.length - 1]);
  console.log("New modified NOTE_DETAILS", NEW_NOTE_DETAILS);
  return NEW_NOTE_DETAILS;
}

// Ensure it's updated after selecting a piano
NEW_NOTE_DETAILS = newNoteDetails(); // Initialize with default

//Creating diffrenet arrays for natural keys and blackKeys

//natural keys
let naturalKeysArray = [];
//accidental keys
let accidentalKeysArray = [];
function pianoKeysArray() {
  naturalKeysArray = [];
  naturalKeysArray = NEW_NOTE_DETAILS.filter((arr) => arr.type === "natural");
  console.log("Array of natural keys", naturalKeysArray);

  //black keys
  accidentalKeysArray = [];
  accidentalKeysArray = NEW_NOTE_DETAILS.filter(
    (arr) => arr.type === "accidental"
  );
  console.log("Array of accidental keys", accidentalKeysArray);
}
pianoKeysArray(); //initialize with default

//creating HTML elements based on data-notes

let naturalKeyNoteElements = [];
let accidentalKeyNoteElements = [];
function pianoKeyNoteElements() {
  naturalKeyNoteElements=[];//resetting
  console.log("Array of natural elements: ", naturalKeyNoteElements);
  //creating naturalkeyNoteElements with their respective attributes
  naturalKeysArray.forEach((item) => {
    naturalKeyNoteElements.push(createKeyNote(item.note, item.type));
  });

  //An array to store the blackKeyNote (Html) Elements that will be loaded/rendered in the DOM
  accidentalKeyNoteElements = [];//resetting
  console.log("Array of accidental elements: ", accidentalKeyNoteElements);
  //creating accidentalkeyNoteElements with their respective attributes
  accidentalKeysArray.forEach((item) => {
    accidentalKeyNoteElements.push(createKeyNote(item.note, item.type));
  });
}
pianoKeyNoteElements(); //initialize with default

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
  loadUI(selectedPiano); //initialize with default
});
//function to load UI
function loadUI(pianoType) {
  //reset selected piano styling
  resetPianoType(pianoContainer);

  //add styling to the piano based on piano selected
  pianoContainer.classList.add(pianoType)
  pianoContainer.innerHTML = "";
  // Clear individual containers for natural and accidental keys
  naturalKeysContainer.innerHTML = "";
  accidentalKeysContainer.innerHTML = "";
  pianoContainer.appendChild(naturalKeysContainer);
  naturalKeyNoteElements.forEach((element) => {
    naturalKeysContainer.appendChild(element);
  });

  pianoContainer.appendChild(accidentalKeysContainer);
  accidentalKeyNoteElements.forEach((element) => {
    accidentalKeysContainer.appendChild(element);
  });
}

//function to reset/clear selected piano
function resetPianoType(pianoContainer){
  pianoContainer.classList.forEach((cls)=>{
    if(cls !== "piano"){
      pianoContainer.classList.remove(cls);
    }
  })
}
