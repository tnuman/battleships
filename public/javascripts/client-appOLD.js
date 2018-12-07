var main = function() {
    "use strict";

    // create tables that represent the gameboards
    createTable(document.getElementById("gameboardYou"), "Y");
    createTable(document.getElementById("gameboardOpp"), "O");
    var you = new player();
    var opponent = you;
    
    // manipulating instruction text
    $("#instruction").text("Place your ship of length 1 somewhere in your sea. The cell you click will be the leftmost part of the ship.");
    
    // placing your ships
    $("#you #gameboardYou td").on("click", function() {
        // this represents the td (cell) that is clicked. It's a 'jQuery' object, so we'll have to use attr instead of getAtrribute
        var $cell = $(this);
        // place the ship in the board of the player object
        you.placeShip($cell.attr("row"), $cell.attr("col"), you.shipsPlaced +1);
        // update classes table for color
        updateYourTable(you);
        //manipulating instruction text
        if(you.shipsPlaced + 1 <= 5) {
            $("#instruction").text("Place your ship of length " + String(you.shipsPlaced + 1)
            + " somewhere in your sea. The cell you click will be the leftmost part of the ship.");
        } else {
            $("#instruction").text("Wait for the opponent to place his ships");
        }   
    });
    
    // guessing opponents ships
    $("#opponent #gameboardOpp td").on("click", function() {
        // actually this doesn't belong here, but because we don't work with game statuses yet it's fine
        $("#instruction").text("Click somewhere in your opponents sea to shoot!");

        // this represents the td (cell) that is clicked. It's a 'jQuery' object, so we'll have to use attr instead of getAtrribute
        var $cell = $(this);
        // update status of this cell in the array
        opponent.updateCellStatus($cell.attr("row"), $cell.attr("col"));
        // update classes table for color
        updateOppTable(opponent);
        // update ships left counter
        $("#shipsLeftOpp span").text(opponent.shipsLeft());
        // check if the game is over
        if (opponent.hasLost()) {
            endGame();
        } 
    });
}
// executes main when the JavaScript file has been loaded
$(document).ready(main);

function endGame() {
    setTimeout(function(){
        alert("You won!!!!");
    }, 500);
}