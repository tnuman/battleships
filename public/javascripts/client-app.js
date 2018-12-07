var main = function() {
    "use strict";
    var socket = new WebSocket("ws://localhost:3000");
    
    var shipsPlaced = 0;
    var myTurn = false;
    var setupPhase = false;

    // create tables that represent the gameboards
    createTable(document.getElementById("gameboardYou"), "Y");
    createTable(document.getElementById("gameboardOpp"), "O");

    // click event for guessing opponents ships
    $("#opponent #gameboardOpp td").on("click", function() {
        var $cell = $(this);
        
        // test if its the turn of the player
        if(myTurn) {
            // test if the cell was already guessed
            if ($cell.attr("class") === "empty") {
                // notify the server where the player guessed
                let message = Messages.O_GUESS;
                message.row = $cell.attr("row");
                message.col = $cell.attr("col");        
                socket.send(JSON.stringify(message));
                
                myTurn = false;
                $("#turnDisplay div").text("Your");
            } else {
                alert("You already clicked this cell. Shoot somewhere else!");
            }     
        } else {
            alert("It's not your turn!");
        }
    });

    // click event for placing ships
    $("#you #gameboardYou td").on("click", function() {
        if (setupPhase) {
            var $cell = $(this);

            // notify the server where the ship needs to be placed
            let message = Messages.O_SHIP_PLACED;
            message.row = $cell.attr("row");
            message.col = $cell.attr("col");
            socket.send(JSON.stringify(message));
        }
    });

    // on message from server
    socket.onmessage = function (event) {
        let incomingMsg = JSON.parse(event.data);

        // if GAME_ABORTED message, notify the player
        if(incomingMsg.type === Messages.T_GAME_ABORTED) {
            alert("Your opponent left");
            $("#turnDisplay").empty();
        }

        // if PLACE_SHIP message, allow the player to place their ships
        if(incomingMsg.type === Messages.T_PLACE_SHIP) {
            // manipulating instruction text
            console.log("setup phase");
            $("#instruction").text("Place your ship of length 1 somewhere in your sea. The cell you click will be the leftmost part of the ship.");
            setupPhase = true;                        
        }

        // if SHIP_ACCPETD message, increment shipsPlaced and update the text
        if(incomingMsg.type === Messages.T_SHIP_ACCEPTED) {
            shipsPlaced++;
            
            //manipulating instruction text
            if(shipsPlaced + 1 <= 5) {
                $("#instruction").text("Place your ship of length " + String(shipsPlaced + 1)
                + " somewhere in your sea. The cell you click will be the leftmost part of the ship.");
            } else {
                $("#instruction").text("Waiting on your opponent");
                setupPhase = false;
            }
        }

        // if YOUR_TURN message, set myTurn to true and modify the turnDisplay and instruction                                
        if(incomingMsg.type === Messages.T_YOUR_TURN) {
            myTurn = true;
            $("#turnDisplay div").text("Your");
            $("#instruction").text("Click anywhere in your opponent's sea to make a guess.");            
        }

        // if UPDATE_OPPONENT message, update the entire view of the opponent
        if(incomingMsg.type === Messages.T_UPDATE_OPPONENT) {
            updateOppTable(incomingMsg.board);
            console.log(incomingMsg.shipsLeft);
            $("#shipsLeftOpp span").text(incomingMsg.shipsLeft);
        }

        // if UPDATE_YOU message, update the entire view of the opponent
        if(incomingMsg.type === Messages.T_UPDATE_YOU) {
            updateYourTable(incomingMsg.board);
            console.log(incomingMsg.shipsLeft);
            $("#shipsLeftYou span").text(incomingMsg.shipsLeft);
        }

        // if GAME_OVER message, call endGame with the provided boolean value
        if(incomingMsg.type === Messages.T_GAME_OVER) {
            setTimeout(endGame(incomingMsg.data), 10000);            
        }
    }
    


}

// executes main when the JavaScript file has been loaded
$(document).ready(main);

function endGame(hasWon) {
    if(hasWon) {
        alert("You won!");
    } else {
        alert("You lost :(");
    }
}