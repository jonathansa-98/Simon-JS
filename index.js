window.onload = init();
// crea documento
function init() {
    var scorePanel = document.querySelector("#score-panel");
    var btnStart = document.createElement("button");
    // btn start
    btnStart.id = "start";
    btnStart.innerHTML = "Start/Restart";
    scorePanel.appendChild(btnStart);

    // p turn
    var turnP = document.createElement("p");
    scorePanel.appendChild(turnP);
    // span turn nº
    var nTurn = document.createElement("span");
    nTurn.id = "turn";
    nTurn.innerHTML = "0";
    turnP.appendChild(nTurn);
    // span (move(s)) turn
    var textTurn = document.createElement("span");
    textTurn.innerHTML = " move(s)";
    turnP.appendChild(textTurn);

    // tablero
    var container = document.querySelector("#container");
    var deck = document.createElement("div");
    deck.id = "deck";
    container.appendChild(deck);
    creaPanel("red", deck);
    creaPanel("green", deck);
    creaPanel("blue", deck);
    creaPanel("yellow", deck);
}

function creaPanel(color, padre) {
    var panel = document.createElement("div");
    panel.id = color;
    panel.className = "panel";
    padre.appendChild(panel);
}

// variables
var pcOrder = []; // orden de iluminaciones pc
var playerOrder = [] // orden de iluminacion persona
var flash; // flashes que aparecieron
var turn; // la ronda en la que estamos
var good; // usuario acierta la ronda
var pcTurn; // bool que dice si es el turno de la maquina
var intervalID;
var win; // si ha ganado todo

const MAX_TURNS = 3; // maximo de turnos que juegas hasta ganar

const deck = document.querySelector('#deck');
const btnStart = document.querySelector("#start");
const turnCounter = document.querySelector("#turn");
const panRed = document.querySelector("#red");
const panGreen = document.querySelector("#green");
const panBlue = document.querySelector("#blue");
const panYellow = document.querySelector("#yellow");
const allPan = document.querySelectorAll(".panel");

// motor del juego
btnStart.addEventListener('click', (event) => {
    play();
});

function play() {
    win = false;
    pcOrder = [];
    playerOrder = [];
    flash = 0;
    intervalID = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (let i = 0; i < MAX_TURNS; i++) {
        pcOrder.push(Math.floor(Math.random() * 4) + 1);
    }
    console.log(pcOrder);
    pcTurn = true;
    intervalID = setInterval(gameTurn, 800);
}

function gameTurn() {
    tooglePanels(false);
    if(flash == turn) {
        clearInterval(intervalID);
        pcTurn = false;
        clearColor();
        tooglePanels(true);
    }
    if (pcTurn) {
        clearColor();
        setTimeout(() => {
            if (pcOrder[flash] == 1) red();
            if (pcOrder[flash] == 2) green();
            if (pcOrder[flash] == 3) blue();
            if (pcOrder[flash] == 4) yellow();
            flash++;
        }, 200);
    }
}

function red() {
    panRed.style.backgroundColor = "tomato";
}
function green() {
    panGreen.style.backgroundColor = "lightgreen";
}
function blue() {
    panBlue.style.backgroundColor = "skyblue";
}
function yellow() {
    panYellow.style.backgroundColor = "yellow";
}

function tooglePanels(active) {
    if(active) {
        allPan.forEach(pan => {
            pan.classList.remove("disabled");
        });
    } else {
        allPan.forEach(pan => {
            pan.classList.add("disabled");
        });
    }
}

function clearColor() {
    panRed.style.backgroundColor = "darkred";
    panGreen.style.backgroundColor = "darkgreen";
    panBlue.style.backgroundColor = "darkblue";
    panYellow.style.backgroundColor = "darkgoldenrod";
}

function flashColor() {
    panRed.style.backgroundColor = "tomato";
    panGreen.style.backgroundColor = "lightgreen";
    panBlue.style.backgroundColor = "skyblue";
    panYellow.style.backgroundColor = "yellow";
}

panRed.addEventListener('click', (event) => {
    playerOrder.push(1);
    check();
    red();
    if(!win) {
        setTimeout(() => {
           clearColor();
        }, 300);
    }
});
panGreen.addEventListener('click', (event) => {
    playerOrder.push(2);
    check();
    green();
    if(!win) {
        setTimeout(() => {
           clearColor();
        }, 300);
    }
});
panBlue.addEventListener('click', (event) => {
    playerOrder.push(3);
    check();
    blue();
    if(!win) {
        setTimeout(() => {
           clearColor();
        }, 300);
    }
});
panYellow.addEventListener('click', (event) => {
    playerOrder.push(4);
    check();
    yellow();
    if(!win) {
        setTimeout(() => {
           clearColor();
        }, 300);
    }
});

function check() {
    if (playerOrder[playerOrder.length - 1] !==
              pcOrder[playerOrder.length - 1]) {
        good = false;
    }
    // gana
    if(playerOrder.length == MAX_TURNS && good) {
        winGame();
    }
    // pierde
    if (!good) {
        flashColor();
        turnCounter.innerHTML = "----";
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();
            //dificil resetea el juego entero
            play();
            //facil empieza desde la ultima tirada
            // compTurn = true;
            // flash = 0;
            // playerOrder = [];
            // good = true;
            // intervalID = setInterval(gameTurn, 800);
        }, 800);
    }
    // continua al siguiente turno
    if(turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        pcTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalID = setInterval(gameTurn, 800);
    }
}

function winGame() {
    flashColor();
    win = true;
    tooglePanels(false);
    congratulations();
}

/* Show victory modal*/
function congratulations() {
    clearInterval(intervalID);
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click', function () {
        modal.style.display = "none";
    });
    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}