const wordName = document.querySelector("#word-name");
const phoneticEng = document.querySelector("#phonetic-info-eng");
const phoneticUsa = document.querySelector("#phonetic-info-us");
const meaning = document.querySelector("#meaning-info");
const targetAudioEng = document.querySelector("#target-audio-eng");
const targetAudioUsa = document.querySelector("#target-audio-us");

const button = document.getElementById("change-button");

button.addEventListener("click", function () {
  fetch("\\words.json")
    .then((response) => response.json())
    .then((data) => {
      const arrayLength = data.length;
      const randomIndex = Math.floor(Math.random() * arrayLength);

      wordName.innerText = data[randomIndex].word;
      meaning.innerText = data[randomIndex].definition;
      phoneticEng.innerText =
        "English :   " + data[randomIndex].phonetics[0].eng;
      phoneticUsa.innerText =
        "American :   " + data[randomIndex].phonetics[0].us;
      targetAudioEng.src = data[randomIndex].audio[0].eng;
      targetAudioUsa.src = data[randomIndex].audio[0].us;
    })
    .catch((error) => console.error("Fetch error:", error));
});

const recordButton = document.getElementById("recordButton");
const stopButton = document.getElementById("stopButton");
const audio = document.getElementById("user-audio");
let mediaRecorder;
let recordedChunks = [];


navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
      console.log(recordedChunks)
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "audio/wav" });
    recordedChunks = [];
    audio.src = URL.createObjectURL(blob);
  };
});

recordButton.addEventListener("click", () => {
  mediaRecorder.start();
  recordButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener("click", () => {
  mediaRecorder.stop();
  recordButton.disabled = false;
  stopButton.disabled = true;
});

