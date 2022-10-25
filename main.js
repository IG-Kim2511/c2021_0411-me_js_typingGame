// 사용 변수
const SETTING_TIME = 10;
let randomIndex = 1;
let words = [];
let time;
let isPlaying = false;
let score = 0;

const url = "https://random-word-api.herokuapp.com/word?number=100";
const timeDisplay = document.querySelector('.time')
const button = document.querySelector('.button')
const wordDisplay = document.querySelector('.word-display')
const wordInput = document.querySelector('.word-input')
const scoreDisplay = document.querySelector('.score')

// 🍀api
function getWords() {
    console.log('getWords')

    axios.get(url).then((res) => {

        res.data.forEach((word) => {
            if (word.length < 9) {
                words.push(word);
            }
            buttonChange('start', 'game start')
        })
        console.log(words)
        wordDisplay.innerText= words[randomIndex];

    }).catch((err) => {
        console.log(err);
    })
}

function init() {
    console.log('init')

    getWords();

    wordInput.addEventListener('input', checkMatch); 
    
    wordInput.addEventListener('change',matchWrong);    
}
init();


const answer = document.querySelector('.answer');


function checkMatch() {   
    console.log('checkMatch')
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {

        if (!isPlaying) {
            toastifyL('error');
            return            
        }

        wordDisplay.innerText="";
        wordInput.value = "";    

        score++;
        scoreDisplay.innerText= score;
        time = SETTING_TIME
      
        randomIndex = Math.floor(Math.random()*words.length);
        wordDisplay.innerText= words[randomIndex];
        toastifyL('success')


        // answer
        answer.innerText = 'good!'
        answer.style.visibility = 'visible'
        setTimeout(() => {            
            answer.style.visibility = 'hidden'
        }, 1000);

        //  timeDisplay color
        timeDisplay.style.backgroundColor = '#3b5999';        
        setTimeout(() => {
            timeDisplay.style.backgroundColor ="";
        }, 100);
    }    
}


// 🍀
let wrong = 0;
const wrongDisplay = document.querySelector('.score_wrong');

function matchWrong(){
    console.log('matchWrong')

    if (wordDisplay.innerHTML.toLowerCase() !== wordInput.value.toLowerCase()){

        if (!isPlaying) {
            toastifyL('error');
            return            
        }        
          wordInput.value = "";
          time = SETTING_TIME      

          wrong++
          wrongDisplay.innerText = wrong;
          wordInput.value = ""; 
  
          randomIndex = Math.floor(Math.random()*words.length);
          wordDisplay.innerText= words[randomIndex];
          toastifyL('wrong')          

        // answer
          answer.innerHTML = 'wrong';                     /* css-js 2 */
          answer.style.visibility = "visible";
          setTimeout(function(){
              answer.style.visibility = "hidden";
         }, 1000);

         //  timeDisplay color
         timeDisplay.style.backgroundColor = '#3b5999';        
         setTimeout(() => {
             timeDisplay.style.backgroundColor ="";
         }, 100);
      } 
  }


function checkStatus() {
    console.log('checkStatus')
    if (!isPlaying && time === 0) {
        isPlaying = false;
        buttonChange('start','game start');
        clearInterval(checkInterval);        
    }    
}


// 🍀run, stop
function run() {
    console.log('run')

    if (words.length < 1) {
        return
        
    }
    wordInput.value= "";
    wordInput.focus()
    score= 0;
    scoreDisplay.innerText = 0;
    time = SETTING_TIME;

    isPlaying= true;

    timeInterval = setInterval(countDown, 1000);

    checkInterval = setInterval(checkStatus, 500);

    buttonChange('loading','ing');    
}

function stop() {
    console.log('stop')

    buttonChange('start', 'game start')
    button.classList.remove('loading');

    time = SETTING_TIME;
    timeDisplay.innerHTML = time;

    score = 0;
    scoreDisplay.innerHTML = score
    // wrong = 0;
    // wrongDisplay.innerHTML = wrong

    clearInterval(timeInterval);   
    
    location.reload();  
}



function countDown() {
    console.log('countDown')

    time>0 ? time-- : isPlaying = false;
    timeDisplay.innerText = time;
    if (!isPlaying) {
        clearInterval(timeInterval)        
    }    
}


function buttonChange(type,text) {
    console.log('buttonChange')

    button.innerText= text;    
    type ==='start' ? button.classList.remove('loading') :  button.classList.add('loading') ;
}


function toastifyL(type) {
        // toastify options
        const option = {
            text: `${wordDisplay.innerText}!!`,
            duration: 3000,
            newWindow: true,
            gravity: "top", // `top` or `bottom`
            position: 'left', // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
        }
        if(type === 'wrong'){
            option.text = 'wrong'       
            option.backgroundColor = 'red'
        }else if (type === 'error') {
            option.text = 'click start button'
            option.position = 'right'
            option.backgroundColor = 'red'
        }
        Toastify(option).showToast();    
}






