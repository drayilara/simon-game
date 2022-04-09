// jshint esversion:6

const greenAudio = new Audio('sounds/green.mp3');
const redAudio = new Audio('sounds/red.mp3');
const yellowAudio = new Audio('sounds/yellow.mp3');
const blueAudio = new Audio('sounds/blue.mp3');
const wrong = new Audio('sounds/wrong.mp3');

const redBtn = document.getElementById('red');
const blueBtn = document.getElementById('blue');
const greenBtn = document.getElementById('green');
const yellowBtn = document.getElementById('yellow');
const title = document.getElementById('level-title');
const body = document.querySelector('body');

const largeScreen = 768;

let buttons = [greenBtn, redBtn, yellowBtn, blueBtn];
let audio = [greenAudio, redAudio, yellowAudio, blueAudio];

let random = () => Math.floor(Math.random() * 4);

let gameLevel = 0;
let gameStart = false;



let computerMoves = [];
let moveByPlayer = [];


start();

function start(){
    let randomIndex = random();
    let randomAudio = audio[randomIndex];
    let randomBtn = buttons[randomIndex];

    let keyboardEventHandler = () =>{
        randomAudio.play();
    
        randomBtn.classList.add('pressed');
    
        setTimeout(() => {
            randomBtn.classList.remove('pressed');
        },100);
    
        document.removeEventListener('keypress', keyboardEventHandler);
    }; 
    
    let mobileEventHandler = () => {
        randomAudio.play();
        randomBtn.classList.add('pressed');
        setTimeout(() => randomBtn.classList.remove('pressed'),100);
    };

    
    
        if (window.screen.width >= largeScreen) {
            document.addEventListener('keypress', keyboardEventHandler);
        } else {
            body.addEventListener('click', mobileEventHandler);
            title.style.fontSize = '25px';
            title.style.lineHeight = '1.5';
            title.innerText = `Press anywhere on the screen to start- do not press the tiles`;
            body.removeEventListener('click', mobileEventHandler);
        }

    gameStart = true;
           
    computerMoves.push(randomBtn.id);
}




playerMove();

function playerMove(){
    
    let btns = document.querySelectorAll('.btn');

    for(let i = 0; i < btns.length; i++){
        currentBtn = btns[i];
        currentBtn.addEventListener('click', evt => {
             
            let clickedBtn = evt.target.id;
            evt.target.classList.add('pressed');
            setTimeout(()=> evt.target.classList.remove('pressed'),100);

             moveByPlayer.push(clickedBtn); 
             if(computerMoves.length == moveByPlayer.length){
                compareMoves();
             }

        });  
    }  
    
}


function computerRandomMove(){
    let randomIndex = random();
    let randomAudio = audio[randomIndex];
    let randomBtn = buttons[randomIndex];

    computerMoves.push(randomBtn.id);

    randomAudio.play();
    randomBtn.classList.add('pressed');
    setTimeout(() => {
        randomBtn.classList.remove('pressed');
    },1000);
}


function compareMoves(){
    for(let i = 0; i < computerMoves.length; i++){
        let computer = computerMoves[i];
        let player = moveByPlayer[i];

        if(computer == player){
            continue;
        }else{
            computerMoves = [];
            moveByPlayer = [];
            gameLevel = 0;
            gameStart = false;
            
            if(window.screen.width >= largeScreen){
                title.innerText = `Game over.Press any key to restart`;
                title.style.fontSize = '2rem';
            }else{
                title.innerText = `Game over,click anywhere to start - do not press the tiles`;
            }
        
            body.classList.add('red');
            setTimeout(() => body.classList.remove('red'),100);
            wrong.play();

            start();

            return;
        }
    }

    computerRandomMove();
    gameLevel++;
    title.innerText = `Level ${gameLevel}`;
    moveByPlayer = [];
}

/* Pusblished at github pages

https://drayilara.github.io/simon-game/


*/
