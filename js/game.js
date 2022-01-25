'use strict';

const WALL = '⬛️'
const FOOD = '<img src="images/dots.png">';
const SUPER_FOOD = '🍬';
const CHERRY = '🍒';
const EMPTY = '';
const GHOST = 'G'


const SIZE = 10;
var gBoard;
var gGame = {
    score: 0,
    scoreTime: hr + ':' + min + ':' + 0,
    isOn: false,
}



var gFoodCount = 0;
var grainMax = 0;
var gCherryInterval

const timer = document.getElementById('stopwatch');


function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true;
    gCherryInterval = setInterval(createCherry, 15000)
    hide('.restart-Btn');
    hide('.game-over-msg');
    startTimer();
}




function buildBoard() {
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 7 && i > 2 && i < SIZE - 3)) {
                board[i][j] = WALL; 
            } else {
                if ((i === 1 && j === 1) ||
                    (i === 1 && j === 8) ||
                    (i === 8 && j === 1) ||
                    (i === 8 && j === 8)) {
                    board[i][j] = SUPER_FOOD
                }
                grainMax++

            }
        }
    }

    return board;
}  


function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver(isVictory) {
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    show('.restart-Btn');
    gGame.isOn = false;
    stopTimer()
    if (isVictory) {
        //true
        console.log('you  Win !!')
        gGame.scoreTime = hr + ':' + min + ':' + sec;
        messegeToShow('you  Win !!');
    } else {
        //false
        console.log('Game Over');
        messegeToShow('Game Over');

    }
}


function createCherry() {
    var emptyCells = getEmptyCells(gBoard)
    if (emptyCells.length === 0) return
    var randomIdx = getRandomInt(0, emptyCells.length - 1)
    var emptyCell = emptyCells[randomIdx]
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)
}


function winCheck() {
    if (gFoodCount == grainMax) {
        gameOver(true)
    }
}

function getEmptyCells(board) {
    var emptyCells = []
      for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === EMPTY) {
                             emptyCells.push({
                    i: i,
                    j: j
                })
            }

        }
    }
    return emptyCells
}


function restartButton() {
    document.querySelector('h2 span').innerText = '0'
    grainMax = 0
    gFoodCount = 0
    gGhosts = []
    gPacmanPicContainer = PACMAN_RIGHT
    resetTimer()
    init()
}