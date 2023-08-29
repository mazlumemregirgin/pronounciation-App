const wordName = document.querySelector("#word-name")
const phonetic = document.querySelector("#phonetic-info")
const meaning = document.querySelector("#meaning-info")



const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const button = document.getElementById('change-button');

button.addEventListener('click', () => {
  fetchRandomWord();
});

function fetchRandomWord() {
  // Rasgele bir kelime seçme
  const randomWords = ["absence", "apple","apartment","airplane","animal","artist","arrow","area","adventure","angel","aspect","alien","alley","argument","anchor","accident","acoustic","actor","affair","amazing","author","attitude","aunt","album","athlete","atmosphere","auction","award","ambition","alleyway","academy","accent","accident","account","accuracy","accusation","achievement","acknowledgment","witness","wonder","worker","world","worry","worth","wrap","writer","writing","yard","year","yell","yellow","yesterday","yield","young","youth",];
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
      const result = JSON.stringify(data, null, 2);
      console.log(result)
      wordName.innerText= result[0];

      
    })
    .catch(error => {
      console.error('Veri çekme hatası:', error);
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