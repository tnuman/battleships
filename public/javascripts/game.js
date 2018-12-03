var main = function() {
    "use strict";

    // create tables that represent the gameboards
    createTable(document.getElementById("gameboardYou"), "Y");
    createTable(document.getElementById("gameboardOpp"), "O");
    var you = new player("you");
    var opponent = you;
    opponent.name = "opponent";
    
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
    
    
    $("#opponent #gameboardOpp td").on("click", function() {
        // this represents the td (cell) that is clicked. It's a 'jQuery' object, so we'll have to use attr instead of getAtrribute
        var $cell = $(this);
        
        // check whether the cell is available
        if (opponent.getCellStatus($cell.attr("row"), $cell.attr("col")) <= 1) {
            console.log("row: " + $cell.attr("row") + " col: " + $cell.attr("col"));
            // update status of this cell in the array
            opponent.updateCellStatus($cell.attr("row"), $cell.attr("col"));
            // update class of cell in table for color
            updateOppTable(opponent);
            if (opponent.hasLost()) {
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

function endGame() {
    setTimeout(function(){ alert("You won!!!!"); }, 500);
}