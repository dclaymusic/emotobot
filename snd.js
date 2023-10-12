
// var bg = new Audio()
// bg.src = './snd/bg.mp3';
// bg.loop = 'true';

var sounds = [];

function initSnd() 
{
    if(isLoaded) {

        // document.getElementById('startdiv').remove();
        var AudioContext = window.AudioContext || window.webkitAudioContext;   
        audioCtx = new AudioContext();
        document.getElementById('loadText').innerHTML = 'Sounds are loading...';
        for(let i = 0; i < sounds.length; i++)
        {
            loadSnd(i);
        }
        loading();
    }
}


function loading()
{
    let loading = setInterval(function () {
        let count = 0;
        for(let i = 0; i < buffers.length; i++)
        {
            if(buffers[i] != null)
            {
                count++;
            }
        }
        if(count == 128)
        {
            document.getElementById('loadText').innerHTML = 'Tap once more to begin.';
            readyToPlay = true;
            clearInterval(loading);
        }
    }, 250);
}

function createAllSounds()
{
    for(let i = 1; i <= 2; i++)
    {
        for(let j = 1; j <= 2; j++)
        {
            for(let k = 1; k <= 2; k++)
            {
                for(let l = 1; l <= 2; l++)
                {
                    for(let m = 1; m <= 2; m++)
                    {
                        for(let n = 0; n <= 3; n++)
                        {
                            let thisSound = `${choices[0][i]}${choices[1][j]}${choices[2][k]}${choices[3][l]}${choices[4][m]}${n}`;
                            sounds.push(thisSound);
                            // buffers.push(thisSound);
                        }
                    }
                }
            }
        }
    }
}


//to call sound by name if feeling lazy
function selectSound(x)
{
    for(let i = 0; i < sounds.length; i++ )
    { 
        if(sounds[i] == x)
        {
            loadSnd(i);
            playSnd(i);
        }
    }
}

function loadSnd(index) {
    const request = new XMLHttpRequest();
    request.open("GET", `./snd/${sounds[index]}.mp3`);
    request.responseType = "arraybuffer";
    request.onload = function() {
    let undecodedAudio = request.response;
    audioCtx.decodeAudioData(undecodedAudio, (data) => buffers[index] = data);
    };
    request.send();
};

function playSnd(index) {
    const source = audioCtx.createBufferSource();
    source.buffer = buffers[index];
    source.connect(audioCtx.destination);
    source.start(audioCtx.currentTime); // play the source immediately
};