import {
  NOTE_DETAILS_32_KEYS as piano32key,
  NOTE_DETAILS_49_KEYS as piano49key,
  NOTE_DETAILS_61_KEYS as piano61key,
  NOTE_DETAILS_76_KEYS as piano76key,
  NOTE_DETAILS_88_KEYS as piano88key,
} from "./data.js";
import { availablePianos } from "./ui.js";
import { selectedPiano } from "./ui.js";


 //for playing audio in browser
 const audioContext=new AudioContext();

//getting piano notedetails for the selected piano

let selectedPianoNoteDetails = "";
availablePianos.forEach((piano) => {
  if (piano.id === selectedPiano) {
    selectedPianoNoteDetails = piano.details;
    selectedPianoNoteDetails.forEach((item) => {
      item.active = false;
    });
    console.log("Selected piano note details:", selectedPianoNoteDetails);
  }
});

//Events for handling key presses

//Event for handling keypressed
//let selectedNote
document.addEventListener("keydown", (e) => {
  //handling key hold (not raising multiple events just single event)
  if (e.repeat) return;
  if (e.type === "keydown") {
    console.log("keypressed", e.key.toUpperCase());

    //getting the entire selected note as the key is pressed
    let selectedNote = getSelectedNote(e.key, selectedPianoNoteDetails);

    if (selectedNote === null) return;

    //set active state as true
    selectedNote.active = true;
    console.log("Selected note when key pressed: ", selectedNote);

    //play note
    playNote();
  }
});

//Event for handling keyrelease
document.addEventListener("keyup", (e) => {
  if (e.type === "keyup") {
    console.log("keyreleased", e.key.toUpperCase());
    let selectedNote = getSelectedNote(e.key, selectedPianoNoteDetails); //this handles the bug, but why?

    if (selectedNote === null) return;
    //set active state as false

    selectedNote.active = false;
    console.log("Selected Note when key released", selectedNote);
    playNote();
  }
});

//function for calculating frequency of note related to the key
function getSelectedNote(keyPressed, selectedPianoNoteDetails) {
  let selectedNote = null;
  selectedPianoNoteDetails.forEach((item) => {
    if (keyPressed.toUpperCase() === item.key) {
      selectedNote = item;
      return;
    }
  });
  return selectedNote;
}

//function for playing note (plays whenever the note state is active)
function playNote() {
  console.log("Play");

  //get the html key elements
  selectedPianoNoteDetails.forEach((item)=>{
    const keyElement = document.querySelector(
      `[data-note="${item.note}"]`
    );

    //toggling the html key elements active state (if true add) 
  keyElement.classList.toggle("active", item.active);

  //stop and remove oscillator from all of the note if any
  if(item.oscillator != null){
    item.oscillator.stop();
    item.oscillator.disconnect();
  }
  })
 
  
 

  //get active notes to make them play sound
  const activeNotes = [...selectedPianoNoteDetails].filter(
    (item) => item.active
  );
  console.log("Current Active notes", activeNotes);


  //if you multiple notes togther it will increase the volume, 
  //since each note has its sound at 100%, it will add up the volume if 
  //multiple keys are pressed, thus we need to offset that

  // for that define gain which will determine what volume to play sound at
  const gain =1/activeNotes.length;

  //start note sound for active note
  activeNotes.forEach((item)=>{
    startNote(item,gain);
  });
}


//function to start note
function startNote(selectedNote,gain){
  //gainnode helps determine volume of output
  const gainNode = audioContext.createGain();
  gainNode.gain.value=gain;
  //setting up oscillator which allows playing sound at a certain frequency 
  const oscillator = audioContext.createOscillator();
  //setting up the frequency at which the oscillator runs/plays 
  oscillator.frequency.value=selectedNote.frequency;
  //type of sound oscillator plays
  oscillator.type='triangle';
  //connecting oscillator and playing through speakers also connecting it to  gainNode to reduce the volume
  oscillator.connect(gainNode).connect(audioContext.destination);
  //start the oscillator play
  oscillator.start();
  //saving the reference of this oscillator inorder to be able to stop in future reference outside this scope
  selectedNote.oscillator=oscillator;


  
}
