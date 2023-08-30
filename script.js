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

//const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
//button.addEventListener('click', () => {
//   fetchRandomWord();
// });

// function fetchRandomWord() {
//   const randomWords = [ "wonderful","resolution","quit","target","disagree","disappear","dislike","misplace","misunderstand","overpopulated","overwork","rebuild","rethink","underpaid","pressure","reliable","skill","management","technology","advise","allow","encourage","persuade","attract","customer"]
//   const randomIndex = Math.floor(Math.random() * randomWords.length);
//   const randomWord = randomWords[randomIndex];

//   const wordUrl = apiUrl + randomWord;

//   fetch(wordUrl)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('HTTP error ' + response.status);
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(JSON.stringify(data, null,2 ))
//       wordName.innerText=data[0].word;
//       phoneticEng.innerText= "English :   " + data[0].phonetic;
//       phoneticUsa.innerText= "American :   " + data[0].phonetic;
//       meaning.innerText=data[0].meanings[0].definitions[0].definition;

//     })
//     .catch(error => {
//       console.error('Veri çekme hatası:', error);

//     });
// }
