'use strict';


const GHOST_PINK = '<img src="images/ghost-pink.png">';
const GHOST_GREEN = '<img src="images/ghost-green.png">';
const GHOST_RED = '<img src="images/ghost-red.png">';
const GHOST_YELLOW = '<img src="images/ghost-yellow.png">';

var ghostPics = [GHOST_GREEN, GHOST_RED, GHOST_YELLOW, GHOST_PINK]





var gGhosts = []
var gIntervalGhosts;


function createGhost(board) {
    var randomPicLink = getRandomPicLink()
    var ghostObj = {
        location: {
            i: 6,
            j: 5,
        },

        currCellContent: FOOD,
        picLink: randomPicLink,
        originalPicLink: '',
        isAlive: true
    }
        gGhosts.push(ghostObj)
        
    board[ghostObj.location.i][ghostObj.location.j] = GHOST
    

}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
 

}


function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].isAlive) {
            var validLocation = moveGhost(gGhosts[i]);
            while (validLocation == false) {
                validLocation = moveGhost(gGhosts[i]);
            }
        } 
    }
}




function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // next cell wall 
    if (nextCell === WALL) return false;
    // nextcell ghost
    if (nextCell === GHOST)
     return false;
    //nex cell packman
    if (nextCell === gPacmanPicContainer) return false;

    // retern grian to cell (if not pink ; issuper? )/if not crossing each ather  
    if (ghost.currCellContent !== GHOST) {
        // model
                    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
                // dom
        renderCell(ghost.location, gBoard[ghost.location.i][ghost.location.j])
    }

    // new location appear

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;

    // dom
    renderCell(ghost.location, ghost.picLink)
    return 'secsess'


}

function getMoveDiff() {
    var randNum = getRandomInt(0, 99);
    if (randNum < 25) {
        return {
            i: 0,
            j: 1
        }
    } else if (randNum < 50) {
        return {
            i: -1,
            j: 0
        }
    } else if (randNum < 75) {
        return {
            i: 0,
            j: -1
        }
    } else {
        return {
            i: 1,
            j: 0
        }
    }
}

function killGhost(nextLocation) {
    for (var k = 0; k < gGhosts.length; k++) {
        if (nextLocation.i === gGhosts[k].location.i && nextLocation.j === gGhosts[k].location.j) {
            // killGhost(k);
            var index = k 
            gGhosts[index].isAlive = false
            if (gGhosts[index].currCellContent === `<img src=\"images/dots.png\">`) {
                updateScore(1)
                gBoard[gGhosts[index].location.i][gGhosts[index].location.j] = EMPTY
                renderCell(gGhosts[index].location, gGhosts[index].picLink)
            } else {
                gBoard[gGhosts[index].location.i][gGhosts[index].location.j] = gGhosts[index].currCellContent
                renderCell(gGhosts[index].location, gGhosts[index].picLink)
            }
            
        }
    }
}

function reviveGhosts() {
    console.log('reviv is on ')
    for (var k = 0; gGhosts.length > k; k++) {
        gGhosts[k].isAlive = true
        gGhosts[k].picLink = gGhosts[k].originalPicLink
        gGhosts[k].originalPicLink = ''
        renderCell(gGhosts[k].location, gGhosts[k].picLink)
    }
    
}
function getRandomPicLink() {
	var a = getRandomInt(0, 2)
	var color = ghostPics[a]
	return color;
}



function ghostColorChengeAll(colorToCange) {
	for (var i = 0; gGhosts.length > i; i++) {
		gGhosts[i].originalPicLink = gGhosts[i].picLink
		gGhosts[i].picLink = colorToCange
		gBoard[gGhosts[i].location.i][gGhosts[i].location.j] = GHOST
		renderCell(gGhosts[i].location, gGhosts[i].picLink)
	}

}