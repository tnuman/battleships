var main = function() {
    "use strict";

    // create tables that represent the gameboards
    createTable(document.getElementById("gameboardYou"));
    createTable(document.getElementById("gameboardOpp"));
    var you = new player;
    var opponent = new player;
    
    // tested manipulating text
    $("#right span").text("5");
    $("#instruction").text("Place your ships somewhere in your sea");
    
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
            $cell.attr("class", opponent.getCellStatus($cell.attr("row"), $cell.attr("col")));
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

// represents a player of this game
var player = function()  {
    /* 10x10 array that represents the status of each cell
    0 = empt7, 1 = undamaged ship, 2 = miss, 3 = hit, 4 = part of sunken ship  
    */
    this.board = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
    ]

    // place a ship on the board, given it's leftmost coordinate and length
    this.placeShip = function (row, col, length) {
        for(let i = 0; i < length; i++) {
            if (this.board[row][col+i] >= 1) {
                return false;
            }
        }
        for(let i = 0; i < length; i++) {
            this.board[row][col+i] == 1;
        }
    }

    // update the status of a cell, given it's row and col value
    this.updateCellStatus = function (row, col) {
        // Check if the cell is available
        if (this.board[row][col] >= 2){
            // if not, say this to the user
            console.log ("Cell already chosen. Please click on another cell");
        } else {
            // if still available, update from empty (0) or undamaged ship (1) to respectively miss (2) and hit (3)
            this.board[row][col] += 2;
            // if it was a hit, increment the hitcount
            if (this.board[row][col] === 3) {
                hitCount++;
            }
        }
    }

    // get the status of a cell, given it's row and col value
    this.getCellStatus = function (row, col) {
        return this.board[row][col];
    }

    // represents the number of hits on the player's ships
    this.hitCount = 0;

    // returns true if the opponent sank all ships of the player
    this.hasLost = function () {
        // when there are 17 hits on the players ships (total length of all ships), the player has lost
        return hitCount === 17;
    }
}

/* idk in hoeverre we deze class nodig hebben. Is misschien alleen nodig 
voor het plaatsen van de schepen, alle benodigde informatie kan denk ik 
bij worden gehouden met de gameboard array van de player objects
*/
var ship = function(length) {
    this.length = length;
    this.isPlaced = false;
}

// creates a table that represents the gameboard
function createTable(destination) {
    var tbl = document.createElement("table");
    var tblbody = document.createElement("tbody");
    
    // make the grid rows
    for(let y = 0; y < 10; y++) {
        var row = document.createElement("tr");                                                
        // make the grid columns
        for(let x = 0; x < 10; x++) {
            var cell = document.createElement("td");
            cell.setAttribute("class", 0);
            /* heb ze row and col genoemd, want y en x waren een beetje verwarrend 
            (hoe meer naar beneden hoe groter de y werd, (y,x) i.p.v. (x,y) omgewisseld etc.)
            haal comment maar weg als je gelezen hebt*/
            cell.setAttribute("row", y);
            cell.setAttribute("col", x);

            cell.style.width = '40px';
            cell.style.height = '40px';
            cell.style.border = 'solid gray';                        
            // append the cell to the row
            row.appendChild(cell);
        }
        // append the row to the table
        tblbody.appendChild(row);
    }
    
    // append the tblbody to the table and the table to the destination
    tbl.appendChild(tblbody);
    destination.appendChild(tbl);
}