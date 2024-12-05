import {
  NOTE_DETAILS_32_KEYS as piano32key,
  NOTE_DETAILS_49_KEYS as piano49key,
  NOTE_DETAILS_61_KEYS as piano61key,
  NOTE_DETAILS_76_KEYS as piano76key,
  NOTE_DETAILS_88_KEYS as piano88key,
} from "./data.js";

//Events for handling key presses

//Event for handling keypressed
document.addEventListener("keydown", (e) => {
  //handling key hold (not raising multiple events just single event)
  if (e.repeat) return;
  if (e.type === "keydown") {
    console.log("keypressed", e.key.toUpperCase());
  }
});

//Event for handling keyrelease
document.addEventListener("keyup", (e) => {
  if (e.type === "keyup") {
    console.log("keyreleased", e.key.toUpperCase());
  }
});
