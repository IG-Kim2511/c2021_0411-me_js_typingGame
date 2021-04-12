/* 1. 버튼이 게임중으로 표시
2. 카운트 다운
2-1 . 맞추면 스코어 , 틀리면 다음단어로
3 . new word show
4. 단어 맞추면 스코어 */


let time = 5;
let timeInterval;
let score = 0;

const button = document.querySelector('.button');
const buttonStop= document.querySelector('.button_stop');

const timeDisplay = document.querySelector('.time');


const wordDisplay = document.querySelector('.word-display');
const wordInput = document.querySelector('.word-input');



// js 2. button
button.addEventListener('click', run);

function run(){
    /* 1. 버튼이 게임중으로 표시
    2. 카운트 다운
        2-1 . 맞추면 스코어 , 틀리면 다음단어로
    3 . new word show
    4. 단어 맞추면 스코어 */
    buttonChange('gaming...');
    button.classList.add('loading');

    countDown()

    console.log(wordDisplay.innerHTML)
    console.log(wordInput.value)

    
    if (wordDisplay.innerHTML.toLowerCase() === wordInput.value.toLowerCase()) {
        score++
        console.log(score)        
    }
}

// js 2-1. input enter (same coding with "js 2")
wordInput.addEventListener('keypress', run_enter);

function run_enter(e) {
    if (e.key === 'Enter') { 
        
        buttonChange('gaming...');
        button.classList.add('loading');

        countDown()

        console.log(wordDisplay.innerHTML)
        console.log(wordInput.value)

        
        if (wordDisplay.innerHTML.toLowerCase() === wordInput.value.toLowerCase()) {
            score++
            console.log(score)        
        }
      }    
}


// js 2-2. countDown
function countDown() {    
    if (time > 0) {
        time--;        
    }  
    timeDisplay.innerHTML = time;
}

// js 2-2. setInterval
timeInterval = setInterval(countDown, 1000);
// clearInterval(timeInterval);


// js 2-3. buttonChange
function buttonChange(p_text) {
    button.innerHTML=p_text;    
}

/* js 4. button_stop 

1. change button to game start
2.  classlist remove */

buttonStop.addEventListener('click',stop);

function stop() {
    buttonChange('Game Start')
    button.classList.remove('loading');
}