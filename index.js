window.onload = init();

function init() {
    var score_panel = document.getElementsByClassName("score-panel")[0];
    var btn_restart = document.createElement("button");
    // btn restart
    btn_restart.className = "restart";
    btn_restart.innerHTML = "Start/Restart";
    btn_restart.addEventListener("click", restart);
    score_panel.appendChild(btn_restart);
    // p moves
    var moves_p = document.createElement("p");
    score_panel.appendChild(moves_p);
    // moves
    var n_moves = document.createElement("span");
    n_moves.className = "moves";
    n_moves.innerHTML = "1";
    moves_p.appendChild(n_moves);
    // texto moves
    var text_moves = document.createElement("span");
    text_moves.innerHTML = " move(s)";
    moves_p.appendChild(text_moves);
    // jugada pc
    var jugada_pc = document.createElement("p");
    jugada_pc.id = "jugada_pc";
    score_panel.appendChild(jugada_pc);
    // jugada persona
    var jugada_persona = document.createElement("p");
    jugada_persona.id = "jugada_persona";
    score_panel.appendChild(jugada_persona);
    // tablero
    var container = document.getElementsByClassName("container")[0];
    var deck = document.createElement("div");
    deck.className = "deck";
    container.appendChild(deck);
    creaPanel(0, "red", deck);
    creaPanel(1, "green", deck);
    creaPanel(2, "blue", deck);
    creaPanel(3, "yellow", deck);
}

function creaPanel(i, color, padre) {
    var panel = document.createElement("div");
    panel.id = i;
    panel.classList.add("panel");
    panel.classList.add(color);
    padre.appendChild(panel);
}

var deck = document.querySelector('.deck');
var colores = ["red", "blue", "yellow", "green"];
var pc_colores;
var mis_colores;
var moves;

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