/* 1. 버튼이 게임중으로 표시
2. 카운트 다운
2-1 . 맞추면 스코어 , 틀리면 다음단어로
3 . new word show
4. 단어 맞추면 스코어 */

let gameTime = 3;
let time = gameTime;
let timeInterval;
let score = 0;
let words= []


const url = "https://random-word-api.herokuapp.com/word?number=100";
const button = document.querySelector('.button');
const buttonStop= document.querySelector('.button_stop');

const timeDisplay = document.querySelector('.time');
const wordDisplay = document.querySelector('.word-display');
const wordInput = document.querySelector('.word-input');
const scoreDisplay = document.querySelector('.score');


// js 2. button click & run
button.addEventListener('click', run);

function run(){
    /* 1. 버튼이 게임중으로 표시
    2. 카운트 다운
        2-1 . 맞추면 스코어 , 틀리면 다음단어로
    3 . new word show                                                          🌊  
    4. 단어 맞추면 스코어, input value to empty                                                           🌊  
    */
    buttonChange('gaming...');
    button.classList.add('loading');

    countDown()
    
   
    console.log(wordDisplay.innerHTML)
    console.log(wordInput.value)

    
    if (wordDisplay.innerHTML.toLowerCase() === wordInput.value.toLowerCase()) {
        score++
        console.log(score)       
        scoreDisplay.innerHTML = score;        
        wordInput.value = "";
    }

    
    getWords();           //js 4. 
    const randomIndex = Math.floor(Math.random()*words.length)
    wordDisplay.innerHTML = words[randomIndex];


/* 
    const randomIndex = Math.floor(Math.random() * words.length)
    wordDisplay.innerText = words[randomIndex];
    runNotification('success')
 */



    time = gameTime;
}

// js 2-1. input enter key (same coding with "js 2")
wordInput.addEventListener('keypress', run_enter);

function run_enter(e) {
    if (e.key === 'Enter') {         
        run();
      }    
}


// js 2-2. countDown
function countDown() {    
    if (time > 0) {
        time--;        
    }else if(time === 0){

    //   🌊  put function of refresh new word                                        🌊  
    }    

    timeDisplay.innerHTML = time;
}

// js 2-2. count down, setInterval 
timeInterval = setInterval(countDown, 1000);
// clearInterval(timeInterval);


// js 2-3. buttonChange
function buttonChange(p_text) {
    button.innerHTML=p_text;    
}

//js 4. axios /  new words


function getWords() {    

    axios.get(url)
    .then(function (response) {
        // handle success
        
        // word.floor(response.data.random() * max);
        // console.log(word)
        // words.push(response.data);

        response.data.forEach((a) => {
            if (a.length < 10) {
                words.push(a)            
            }  
        });

        console.log(words)
        buttonChange('getWords');

        /*                                                                          🌊  
        🚀2. random 
        4. less than 10 letters word , take
        6. push those word to words array
        
        */
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });   
}



/* js 10. button_stop 

1. change button to game start
2.  classlist remove of button
3. reset time
4. reset new word                                                          🌊  

*/

buttonStop.addEventListener('click',stop);

function stop() {
    buttonChange('Game Start')
    button.classList.remove('loading');
    time = gameTime;
}