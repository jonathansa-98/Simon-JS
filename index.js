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
    // turn
    var nTurn = document.createElement("span");
    nTurn.id = "turn";
    turnP.appendChild(nTurn);
    // texto turn
    var textTurn = document.createElement("span");
    textTurn.innerHTML = " move(s)";
    turnP.appendChild(textTurn);

    // jugada pc
    var jugadaPc = document.createElement("p");
    jugadaPc.id = "jugadaPc";
    scorePanel.appendChild(jugadaPc);
    // jugada persona
    var jugadaPersona = document.createElement("p");
    jugadaPersona.id = "jugadaPersona";
    scorePanel.appendChild(jugadaPersona);

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
var order = []; // orden de iluminaciones pc
var playerOrder = [] // orden de iluminacion persona
var flash; // flashes que aparecieron
var turn; // la ronda en la que estamos
var good; // usuario acierta la ronda
var compTurn; // bool que dice si es el turno de la maquina
var intervalID;
var win; // si ha ganado todo

const MAX_TURNS = 5; // maximo de turnos que juegas hasta ganar

const deck = document.querySelector('#deck');
const btnStart = document.querySelector("#start");
const turnCounter = document.querySelector("#turn");
const panRed = document.querySelector("#red");
const panGreen = document.querySelector("#green");
const panBlue = document.querySelector("#blue");
const panYellow = document.querySelector("#yellow");
const allPan = document.querySelectorAll(".panel");

btnStart.addEventListener('click', (event) => {
    play();
});

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalID = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (let i = 0; i < MAX_TURNS; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    console.log(order);
    compTurn = true;
    intervalID = setInterval(gameTurn, 800);
}

function gameTurn() {
    activatePanels(false);
    if(flash == turn) {
        clearInterval(intervalID);
        compTurn = false;
        clearColor();
        activatePanels(true);
    }
    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();//panRed.classList.add("pulsa");
            if (order[flash] == 2) two();//panGreen.classList.add("pulsa");
            if (order[flash] == 3) three();//panBlue.classList.add("pulsa");
            if (order[flash] == 4) four();//panYellow.classList.add("pulsa");
            flash++;
        }, 200);
    }
}

function one() {
    panRed.style.backgroundColor = "tomato";
    // panRed.classList.add("pulsa");
}
function two() {
    panGreen.style.backgroundColor = "lightgreen";
}
function three() {
    panBlue.style.backgroundColor = "skyblue";
}
function four() {
    panYellow.style.backgroundColor = "yellow";
}

function activatePanels(active) {
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
    /*allPan.forEach(pan => {
        pan.classList.remove("pulsa");
    });*/
    panRed.style.backgroundColor = "darkred";
    panGreen.style.backgroundColor = "darkgreen";
    panBlue.style.backgroundColor = "darkblue";
    panYellow.style.backgroundColor = "darkgoldenrod";
}

function flashColor() {
    /*allPan.forEach(pan => {
        pan.classList.add("pulsa");
    });*/
    panRed.style.backgroundColor = "tomato";
    panGreen.style.backgroundColor = "lightgreen";
    panBlue.style.backgroundColor = "skyblue";
    panYellow.style.backgroundColor = "yellow";
}

panRed.addEventListener('click', (event) => {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
        setTimeout(() => {
           clearColor();
        }, 300);
    }
});
panGreen.addEventListener('click', (event) => {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
        setTimeout(() => {
           clearColor();
        }, 300);
    }
});
panBlue.addEventListener('click', (event) => {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
        setTimeout(() => {
           clearColor();
        }, 300);
    }
});
panYellow.addEventListener('click', (event) => {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
        setTimeout(() => {
           clearColor();
        }, 300);
    }
});

function check() {
    if (playerOrder[playerOrder.length - 1] !==
              order[playerOrder.length - 1]) {
        good = false;
    }
    if(playerOrder.length == MAX_TURNS && good) {
        winGame();
    }
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
    if(turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalID = setInterval(gameTurn, 800);
    }
}

function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    win = true;
    activatePanels(false);
}

/*

var colores = ["red", "blue", "yellow", "green"];
var pc_colores;
var mis_colores;
var moves;

*/
/*******************************/
/*


// addEventListener paneles
deck.addEventListener('click', e => {
    var panel = e.target;
    if (panel.classList.contains('panel')) {
        checkJugada(panel);
    }
});

function restart() {
    pc_colores = [];
    mis_colores = [];
    moves = 5;
    console.log(colores);
    for (let x = 0; x < moves; x++) {
        randomColores();
    }
    console.log(pc_colores);
    for (let j = 0; j < moves; j++) {
        //animarPanel(j);
        verJugadaPc();
    }

    var interval = setInterval(() => {
        if (moves == 25) {
            clearInterval(interval);
        }
        moves++;
        console.log(moves);
    }, 1000);
}

function randomColores() {
    var num;
    num = Math.floor(Math.random() * 4);
    pc_colores.push(colores[num]);
}

// ver todos los pasos que ha hecho el pc.
function verJugadaPc() {
    var jugada_pc = document.querySelector("#jugada_pc");
    jugada_pc.innerHTML = "PC eligio: ";
    for (let f = 0; f < pc_colores.length; f++) {
        jugada_pc.innerHTML += pc_colores[f] + " ";
    }
}

// ver todos los pasos que ha hecho la persona.
function verJugadaMia() {
    var jugada_persona = document.querySelector("#jugada_persona");
    jugada_persona.innerHTML = "TU elegiste: ";
    for (let f = 0; f < mis_colores.length; f++) {
        jugada_persona.innerHTML += mis_colores[f] + " ";
    }
}

function checkJugada(panel) {
    if (mis_colores != undefined) {
        console.log(panel.classList[1]);
        mis_colores.push(panel.classList[1]);
        verJugadaMia();
    }
}

/*
function animarPanel(i) {
    var paneles = document.getElementsByClassName("panel");
    for (var panel of paneles) {
        if(panel.classList.contains(pc_colores[i])){
            console.log(pc_colores[i]);
            setTimeout(() => {
                panel.classList.add("pulsa");
            }, 500);
            panel.classList.remove("pulsa");
            console.log(panel.className);

        }
    }
}*/