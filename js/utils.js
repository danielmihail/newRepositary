'use strict'
// function printMat(mat, selector) {
//   var strHTML = '<table border="0"><tbody>';
//   for (var i = 0; i < mat.length; i++) {
//     strHTML += '<tr>';
//     for (var j = 0; j < mat[0].length; j++) {
//       var cell = mat[i][j];
//       var className = 'cell cell-' + i + '-' + j;
//       strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
//     }
//     strHTML += '</tr>'
//   }
//   strHTML += '</tbody></table>';
//   var elContainer = document.querySelector(selector);
//   elContainer.innerHTML = strHTML;
// }

// // location such as: {i: 2, j: 7}
// function renderCell(location, value) {
//   // Select the elCell and set the value
//   var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
//   elCell.innerHTML = value;
// }

// function getRandomIntInclusive(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

var hr = 0;
var min = 0;
var sec = -1;
var stoptime = true;

function printMat(mat, selector) {
	var strHTML = '<table border="0" class="board"><tbody >';
	for (var i = 0; i < mat.length; i++) {
		strHTML += '<tr>';
		for (var j = 0; j < mat[0].length; j++) {
			var cell = mat[i][j];
			if(cell === GHOST){
				cell = gGhosts[0].picLink
			}
			var className = 'cell cell' + i + '-' + j;
			strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
		}
		strHTML += '</tr>'
	}
	strHTML += '</tbody></table>';
	var elContainer = document.querySelector(selector);
	elContainer.innerHTML = strHTML;
}


function renderCell(location, value) {
	var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
		elCell.innerHTML = value;
}


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}



function hide(selector) {
	document.querySelector(selector).classList.add('hide')
}

function show(selector) {
	document.querySelector(selector).classList.remove('hide')
}




function messegeToShow(msg){
	var elCell = document.querySelector(`.game-over-msg`) 
	elCell.innerHTML = msg
	show('.game-over-msg')
}
// for local storege 
function getNextGame() {
	var oldNum = loadFromStorage('playersCounter')
	var newNum = oldNum + 1
	return newNum
}

// function saveToStorage(key, val) {
// 	localStorage.setItem(key, JSON.stringify(val))
// }



// function loadFromStorage(key) {
// 	var val = localStorage.getItem(key)
// 	return JSON.parse(val)
// }

/// for stopwach
function timerCycle() {
	if (stoptime == false) {
		sec = parseInt(sec);
		min = parseInt(min);
		hr = parseInt(hr);

		sec = sec + 1;

		if (sec == 60) {
			min = min + 1;
			sec = 0;
		}
		if (min == 60) {
			hr = hr + 1;
			min = 0;
			sec = 0;
		}

		if (sec < 10 || sec == 0) {
			sec = '0' + sec;
		}
		if (min < 10 || min == 0) {
			min = '0' + min;
		}
		if (hr < 10 || hr == 0) {
			hr = '0' + hr;
		}

		timer.innerHTML = hr + ':' + min + ':' + sec;

		setTimeout("timerCycle()", 1000);
	}
}

function resetTimer() {
	timer.innerHTML = "00:00:00";
	stoptime = true;
	hr = 0;
	sec = -1;
	min = 0;
}


function startTimer() {
	if (stoptime == true) {
		stoptime = false;
		timerCycle();
	}
}

function stopTimer() {
	if (stoptime == false) {
		stoptime = true;
	}
}





function getRandomExcept(min, max, except) {
	except.sort(function (a, b) {
		return a - b;
	});
	var random = Math.floor(Math.random() * (max - min + 1 - except.length)) + min;
	var i;
	for (i = 0; i < except.length; i++) {
		if (except[i] > random) {
			break;
		}
		random++;
	}
	return random;
}