'use strict';
const PACMAN_RIGHT = '<img src="images/pacman-right.png">'
const PACMAN_LEFT = '<img src="images/pacman-left.png">'
const PACMAN_UP = '<img src="images/pacman-up.png">'
const PACMAN_DOWN = '<img src="images/pacman-down.png">'

var gPacmanPicContainer  = '<img src="images/pacman-right.png">';

var gPacman;



function createPacman(board) {
    gPacman = {
        location: {
            i: 4,
            j: 8
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = gPacmanPicContainer
    gFoodCount++



}


function movePacman(ev) {

    if (!gGame.isOn) return;
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;

    var nextCell = gBoard[nextLocation.i][nextLocation.j]


    if (nextCell === WALL) return;

    if (nextCell === FOOD) {
        updateScore(1);
        gFoodCount++

        winCheck()
    } else if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        ghostColorChengeAll(GHOST_PINK)
        gPacman.isSuper = true
        console.log('is supper is on ')
        //gPacman.isSuper = false
        setTimeout(()=>{
            reviveGhosts()
            gPacman.isSuper = false
        }, 5500)
        gFoodCount++
        winCheck()

        // if eats ghost 
    } else if (nextCell === GHOST) {
        // if eats ghost at is supper mode 
        if (gPacman.isSuper === true) {
            killGhost(nextLocation)
            //if eats ghost at not supperfood mode 
        } else {
            console.log('gameover')
            gameOver(false);
            renderCell(gPacman.location, EMPTY)
            return;
        }
    }
    // if eats cherry 
    else if (nextCell === CHERRY) {
        updateScore(15)
    }
    // pos that you laeve------- 
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    //  ---------------------------
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;
    // pos thet you go to ++++++++
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = gPacmanPicContainer;
    // update the dom
    renderCell(gPacman.location, gPacmanPicContainer);


}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            gPacmanPicContainer = PACMAN_UP
            break;
        case 'ArrowDown':
            nextLocation.i++;
            gPacmanPicContainer = PACMAN_DOWN
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            gPacmanPicContainer = PACMAN_LEFT
            break;
        case 'ArrowRight':
            nextLocation.j++;
            gPacmanPicContainer = PACMAN_RIGHT
            break;
        default:
            return null;
    }
    return nextLocation;
}