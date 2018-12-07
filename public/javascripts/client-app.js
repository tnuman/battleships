var main = function() {
    "use strict";

    // create tables that represent the gameboards
    createTable(document.getElementById("gameboardYou"), "Y");
    createTable(document.getElementById("gameboardOpp"), "O");
}

// executes main when the JavaScript file has been loaded
$(document).ready(main);

function endGame(hasWon) {
    if(hasWon) {
        alert("You won!")
    } else {
        alert("You lost :(")
    }
}