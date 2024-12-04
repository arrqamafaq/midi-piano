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

//creating HTML elements based on data-notes

//Getting the paino app
const pianoContainer = document.querySelector(".piano");



//An array to store the KeyNote (Html) Elements that will be loaded/rendered in the DOM
let keyNoteElements = [];
console.log("Array of elmts: ", keyNoteElements);

//creating keyNoteElements with their respective attributes
NOTE_DETAILS.forEach((item) => {
  //Determining the (class) type of KeyNote Element
  let keyType;
  item.note.length === 1 ? (keyType = "white") : (keyType = "black");
  keyNoteElements.push(createKeyNote(item.note, keyType));
});

//function for creating any type of keyNoteElement
function createKeyNote(noteValue, noteType) {
  const note = document.createElement("div");
  note.classList.add("key");
  note.classList.add(noteType);
  note.setAttribute("data-note", noteValue);
  return note;
}

//loading the div elemts on UI
window.addEventListener("DOMContentLoaded",()=>{
    keyNoteElements.forEach((element)=>{
        pianoContainer.appendChild(element);
    });
})
