
let gameTime = 10;
let time = gameTime;
let timeInterval;
let score = 0;
let wrong = 0;
let words =[];

const url = "https://random-word-api.herokuapp.com/word?number=1000";

const answer = document.querySelector('.answer');
const button = document.querySelector('.button');
const buttonStop= document.querySelector('.button_stop');

const wordDisplay = document.querySelector('.word-display');
const wordInput = document.querySelector('.word-input');
const wrongDisplay = document.querySelector('.score_wrong');

const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');


// js 1. start
init();

function init() {
  getWords();           //js 4. 
  wordInput.addEventListener('input',match);
  wordInput.addEventListener('change',matchWrong);

  time = 1000;
  timeDisplay.innerHTML = time;
}

//js 4. axios /  new words

function getWords() {    

    axios.get(url)
    .then(function (response) {
        // handle success
        
        // word.floor(response.data.random() * max);
        // console.log(word)
     
        response.data.forEach((a) => {
            if (a.length < 7) {
                words.push(a)            
            }  
        });

        console.log(words)
        buttonChange('game start');
      
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });   
}

// js 2. button click & run / input click & run

button.addEventListener('click', run);
wordInput.addEventListener('click', run);

function run(){
 
    time = gameTime;
    buttonChange('gaming...');
    button.classList.add('loading');

    countDown();
   
    console.log(wordDisplay.innerHTML)
 
    wordDisplay.innerHTML = words[Math.floor(Math.random()*100)];
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
        // wordDisplay.innerHTML = words[Math.floor(Math.random()*100)];
        run();       
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

// js 2-4 input.value = wordDisplay.inner html , check
function match(i){

    if (wordDisplay.innerHTML.toLowerCase() === wordInput.value.toLowerCase()) { 
        score++
        scoreDisplay.innerHTML = score;        
        wordInput.value = "";
        wordDisplay.innerHTML = words[Math.floor(Math.random()*100)];
        run();

        answer.innerHTML = 'good!';                     /* css-js 2 */
        answer.style.visibility = "visible";        
        setTimeout(function(){
            answer.style.visibility = "hidden";
       }, 1000);
    }
    
    if (score === 10) {
        answer.innerHTML = 'Cara mia!';                   
        answer.style.visibility = "visible";        
        setTimeout(function(){
            answer.style.visibility = "hidden";
       }, 1000);        
    } 
}


function matchWrong(){

  if (wordDisplay.innerHTML.toLowerCase() !== wordInput.value.toLowerCase()){
        wrong++
        wrongDisplay.innerHTML = wrong;
        wordInput.value = ""; 

        answer.innerHTML = 'wrong';                     /* css-js 2 */
        answer.style.visibility = "visible";
        setTimeout(function(){
            answer.style.visibility = "hidden";
       }, 1000);
    } 
}

/* js 10. button_stop 

1. change button to game start
2. classlist remove of button
3. reset time and stop                                                  🌊  
*/

buttonStop.addEventListener('click',stop);

function stop() {
    buttonChange('Game Start')
    button.classList.remove('loading');

    time = 1000;
    timeDisplay.innerHTML = time;

    score = 0;
    scoreDisplay.innerHTML = score
    wrong = 0;
    wrongDisplay.innerHTML = wrong

    // clearInterval(timeInterval);   
}


