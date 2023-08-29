const wordName = document.querySelector("#word-name")
const phonetic = document.querySelector("#phonetic-info")
const meaning = document.querySelector("#meaning-info")
const targetAudio = document.querySelector("#target-audio")


const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const button = document.getElementById('change-button');

button.addEventListener('click', () => {
  fetchRandomWord();
});

function fetchRandomWord() {
  // Rasgele bir kelime seçme
  const randomWords = [ "apple","apartment","angel","aspect","alien","alley","accident","acoustic","congratulations","actor","ambition","accent","accident","account","accusation","achievement","witness","worker","world","wrap","writer","writing","year","yellow","yield","young","youth",];
  const randomIndex = Math.floor(Math.random() * randomWords.length);
  const randomWord = randomWords[randomIndex];

  const wordUrl = apiUrl + randomWord;
  
  fetch(wordUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      wordName.innerText=data[0].word;
      phonetic.innerText=data[0].phonetic
      meaning.innerText=data[0].meanings[0].definitions[0].definition;
      targetAudio.src=data[0].phonetics[0].audio;
    })
    .catch(error => {
      console.error('Veri çekme hatası:', error);
      fetchRandomWord()
    });


    

  
  
}












    const recordButton = document.getElementById('recordButton');
    const stopButton = document.getElementById('stopButton');
    const audio = document.getElementById('user-audio');
    let mediaRecorder;
    let recordedChunks = [];

    // Kullanıcı izinlerini kontrol et
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'audio/wav' });
                recordedChunks = [];
                audio.src = URL.createObjectURL(blob);
            };
        });

    recordButton.addEventListener('click', () => {
        mediaRecorder.start();
        recordButton.disabled = true;
        stopButton.disabled = false;
    });

    stopButton.addEventListener('click', () => {
        mediaRecorder.stop();
        recordButton.disabled = false;
        stopButton.disabled = true;
    });