/* 1. 버튼이 게임중으로 표시
2. 카운트 다운
2-1 . 맞추면 스코어 , 틀리면 다음단어로
3 . new word show
4. 단어 맞추면 스코어 */


let time = 5;

const button = document.querySelector('.button');

const timeDisplay = document.querySelector('.time');


button.addEventListener('click', run);
function run(){
    /* 1. 버튼이 게임중으로 표시
    2. 카운트 다운
        2-1 . 맞추면 스코어 , 틀리면 다음단어로
    3 . new word show
    4. 단어 맞추면 스코어 */
    // buttonChange('gaming...');
    button.classList.add('loading');

    countDown()
}

function countDown() {
    
    if (time > 0) {
        time--;        
    }  
    timeDisplay.innerHTML = time;

    // loop를 만들어야. setInterval, clearInterval          <--
}

// function buttonChange(a_text) {


//     button.innertext(a_text);    
// }