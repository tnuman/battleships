var main = function() {
    "use strict";

    // create tables that represent the gameboards
    createTable(document.getElementById("gameboardYou"), "Y");
    createTable(document.getElementById("gameboardOpp"), "O");
    var you = new player;
    var opponent = you;
    
    // tested manipulating text
    $("#right span").text("5");
    $("#instruction").text("Place your ship of length 1 somewhere in your sea. The cell you click will be the leftmost part of the ship.");
    
    $("#you #gameboardYou td").on("click", function() {
        // this represents the td (cell) that is clicked. It's a 'jQuery' object, so we'll have to use attr instead of getAtrribute
        var $cell = $(this);

        you.placeShip($cell.attr("row"), $cell.attr("col"), you.shipsPlaced +1);
        updateYourTable(you);
        if(you.shipsPlaced + 1 > 5) {
            $("#instruction").text("Wait for the opponent to place his ships");
        } else {
            $("#instruction").text("Place your ship of length " + String(you.shipsPlaced + 1) + " somewhere in your sea. The cell you click will be the leftmost part of the ship.");
        }   
    })
    
    
    // test eventhandler: when you click on a cell and it is available, you can see which cell you clicked in the console
    $("#opponent #gameboardOpp td").on("click", function() {
        // this represents the td (cell) that is clicked. It's a 'jQuery' object, so we'll have to use attr instead of getAtrribute
        var $cell = $(this);
        
        // check whether the cell is available
        if (opponent.getCellStatus($cell.attr("row"), $cell.attr("col")) <= 1) {
            console.log("row: " + $cell.attr("row") + " col: " + $cell.attr("col"));
            // update status of this cell in the array
            opponent.updateCellStatus($cell.attr("row"), $cell.attr("col"));
            // updat class of cell in table for color
            updateTableCell($cell, opponent);
            if(opponent.hasLost()) {
                endGame();
            }
        } else {
            console.log("Already clicked this cell");
        }
    });

}

// Executes main when the JavaScript file has been loaded
$(document).ready(main);

// represents a game
var game = function(gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;                    
    this.gameState = "0 JOINT";
}

/* idk in hoeverre we deze class nodig hebben. Is misschien alleen nodig 
voor het plaatsen van de schepen, alle benodigde informatie kan denk ik 
bij worden gehouden met de gameboard array van de player objects
*/
var ship = function(length) {
    this.length = length;
    this.isPlaced = false;
}

function updateTableCell(cell, player) {
    var status = player.getCellStatus(cell.attr("row"), cell.attr("col"));
    console.log(player.getCellStatus(cell.attr("row"), cell.attr("col")));
    if(status === 0) {
        cell.attr("class", "empty");
    }
    if(status === 1) {
        cell.attr("class", "ship");
    }
    if(status === 2) {
        cell.attr("class", "miss");
    }
    if(status === 3) {
        cell.attr("class", "hit");
    }
    if(status === 4) {
        cell.attr("class", "sunk");
    }
}

function updateYourTable(player) {
    for(let y = 0; y < 10; y++) {
        for(let x = 0; x < 10; x++) {
            // updateTableCell(document.getElementById(prefix + String(y) + String(x)), player);
            var element = "#Y" + String(y) + String(x);
            updateTableCell($(element), player)
        }
    }
}

function endGame() {
    setTimeout(function(){ alert("You won!!!!"); }, 500);
}