import {
  NOTE_DETAILS_32_KEYS as piano32key,
  NOTE_DETAILS_49_KEYS as piano49key,
  NOTE_DETAILS_61_KEYS as piano61key,
  NOTE_DETAILS_76_KEYS as piano76key,
  NOTE_DETAILS_88_KEYS as piano88key,
} from "./data.js";
import { availablePianos } from "./ui.js";
console.log(availablePianos);
import { selectedPianoNoteDetails } from "./ui.js";

//for playing audio in browser
const audioContext = new AudioContext();

//getting piano notedetails for the selected piano

// let selectedPianoNoteDetails = "";
// availablePianos.forEach((piano) => {
//   if (piano.id === getSelectedPiano()) {
//     selectedPianoNoteDetails = piano.details;
//     selectedPianoNoteDetails.forEach((item) => {
//       item.active = false;
//     });
//     console.log("Selected piano note details:", selectedPianoNoteDetails);
//   }
// });

//Events for handling key presses

//Event for handling keypressed
let currentNote=null;
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


document.addEventListener("mousedown", (e) => {
  const clickedKeyNote = e.target.getAttribute("data-note");
  console.log("clicked note",clickedKeyNote)
  if (clickedKeyNote) {
    currentNote = null;
    selectedPianoNoteDetails.forEach((item) => {
      if (clickedKeyNote === item.note) {
        currentNote = item;
        return;
      }
    });
    if (currentNote === null) return;
    currentNote.active = true;
    playNote();
  }
});
document.addEventListener("mouseup", (e) => {
  if (currentNote && currentNote.active) {
    currentNote.active = false;
    currentNote=null;
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
// function playNote() {
//   console.log("Play");

//   //get the html key elements
//   selectedPianoNoteDetails.forEach((item) => {
//     const keyElement = document.querySelector(`[data-note="${item.note}"]`);

//     //toggling the html key elements active state (if true add)
//     keyElement.classList.toggle("active", item.active);

//     //stop and remove oscillator from all of the note if any
//     if (item.oscillator != null) {
//       item.oscillator.stop();
//       item.oscillator.disconnect();

//       //gpt
//       // Loop through each oscillator in the array
//       item.oscillatorH.forEach((osc) => {
//         osc.stop(); // Stop the oscillator
//         osc.disconnect(); // Disconnect it from the audio graph
//       });
//     }
//   });

//   //get active notes to make them play sound
//   const activeNotes = [...selectedPianoNoteDetails].filter(
//     (item) => item.active
//   );
//   console.log("Current Active notes", activeNotes);

//   //if you multiple notes togther it will increase the volume,
//   //since each note has its sound at 100%, it will add up the volume if
//   //multiple keys are pressed, thus we need to offset that

//   // for that define gain which will determine what volume to play sound at
//   const gain = 1 / activeNotes.length;

//   //start note sound for active note
//   activeNotes.forEach((item) => {
//     startNote(item, gain);
//   });
// }

//function to start note
// function startNote(selectedNote, gain) {
//   //gainnode helps determine volume of output
//   const gainNode = audioContext.createGain();
//   gainNode.gain.value = gain;
//   //setting up oscillator which allows playing sound at a certain frequency
//   const oscillator = audioContext.createOscillator();
//   //setting up the frequency at which the oscillator runs/plays
//   oscillator.frequency.value = selectedNote.frequency;
//   //type of sound oscillator plays
//   oscillator.type = "sine";

//   //gpt for evelope efect
//   gainNode.gain.setValueAtTime(gain, audioContext.currentTime); // Start at full volume
//   gainNode.gain.exponentialRampToValueAtTime(
//     0.01,
//     audioContext.currentTime + 1.5
//   ); // Fade out

//   //connecting oscillator and playing through speakers also connecting it to  gainNode to reduce the volume
//   oscillator.connect(gainNode).connect(audioContext.destination);
//   //start the oscillator play
//   oscillator.start();
//   //saving the reference of this oscillator inorder to be able to stop in future reference outside this scope
//   selectedNote.oscillator = oscillator;

//   //harmonics by gpt
//   const fundamentalOscillator = audioContext.createOscillator();
//   const harmonicOscillator = audioContext.createOscillator();

//   // Fundamental frequency
//   fundamentalOscillator.frequency.value = selectedNote.frequency;

//   // First harmonic (octave above)
//   harmonicOscillator.frequency.value = selectedNote.frequency * 2;

//   // Set waveforms
//   fundamentalOscillator.type = "sine";
//   harmonicOscillator.type = "sine";

//   // Gain nodes to control volume
//   const fundamentalGain = audioContext.createGain();
//   const harmonicGain = audioContext.createGain();
//   fundamentalGain.gain.value = gain; // Base volume
//   harmonicGain.gain.value = gain * 0.5; // Lower volume for harmonics

//   // Connect oscillators and gain nodes
//   fundamentalOscillator
//     .connect(fundamentalGain)
//     .connect(audioContext.destination);
//   harmonicOscillator.connect(harmonicGain).connect(audioContext.destination);

//   // Start oscillators
//   fundamentalOscillator.start();
//   harmonicOscillator.start();

//   // Save reference to stop later
//   selectedNote.oscillatorH = [fundamentalOscillator, harmonicOscillator];
// }

//GPT UPDATED
function playNote() {
  console.log("Play");

  // Update active state and stop oscillators for all notes
  selectedPianoNoteDetails.forEach((item) => {
    const keyElement = document.querySelector(`[data-note="${item.note}"]`);

    // Update key element active state
    keyElement.classList.toggle("active", item.active);

    // Stop and disconnect any existing oscillators
    if (item.oscillator) {
      item.oscillator.stop();
      item.oscillator.disconnect();
    }
    if (item.oscillatorH) {
      item.oscillatorH.forEach((osc) => {
        osc.stop();
        osc.disconnect();
      });
    }
  });

  // Get currently active notes
  const activeNotes = selectedPianoNoteDetails.filter((item) => item.active);
  console.log("Current Active Notes:", activeNotes);

  // Calculate gain to prevent volume overload
  const gain = activeNotes.length > 0 ? 1 / activeNotes.length : 0;

  // Start playing sound for active notes
  activeNotes.forEach((note) => {
    startNote(note, gain);
  });
}

function startNote(selectedNote, gain) {
  // Create gain node for volume control
  const gainNode = audioContext.createGain();

  // Create oscillators for fundamental and harmonic frequencies
  const fundamentalOscillator = audioContext.createOscillator();
  const harmonicOscillator = audioContext.createOscillator();

  // Set frequencies for fundamental and harmonic
  fundamentalOscillator.frequency.value = selectedNote.frequency;
  harmonicOscillator.frequency.value = selectedNote.frequency * 2; // First harmonic (octave above)

  // Set oscillator waveforms
  fundamentalOscillator.type = "sine"; // Smooth sound
  harmonicOscillator.type = "triangle"; // Richer harmonic

  // Set envelope (ADSR: Attack, Decay, Sustain, Release)
  const now = audioContext.currentTime;
  gainNode.gain.setValueAtTime(0, now); // Start at 0 volume
  gainNode.gain.linearRampToValueAtTime(gain, now + 0.05); // Attack: Quickly rise to full volume
  gainNode.gain.exponentialRampToValueAtTime(gain * 0.7, now + 0.3); // Decay: Slightly reduce volume
  gainNode.gain.setValueAtTime(gain * 0.7, now + 0.3); // Sustain: Hold at reduced volume
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.5); // Release: Fade out

  // Connect oscillators and gain node to destination
  fundamentalOscillator.connect(gainNode);
  harmonicOscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Start oscillators
  fundamentalOscillator.start();
  harmonicOscillator.start();

  // Stop oscillators after release phase
  fundamentalOscillator.stop(now + 1.5);
  harmonicOscillator.stop(now + 1.5);

  // Save references for cleanup
  selectedNote.oscillator = fundamentalOscillator;
  selectedNote.oscillatorH = [harmonicOscillator];
}
