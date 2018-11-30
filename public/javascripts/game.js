var main = function() {
    createTable(document.getElementById("gameboardYou"));
    createTable(document.getElementById("gameboardOpp"));
}
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
    0 = empty, 1 = undamaged ship, 2 = miss, 3 = hit, 4 = part of sunken ship  
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
    this.placeShip = new function (y, x, length) {
        for(let i = 0; i < length; i++) {
            if (this.board[y][x+i] >= 1) {
                return false;
            }
        }
        for(let i = 0; i < length; i++) {
            this.board[y][x+i] == 1;
        }
    }

    // update the status of a cell, given it's y and x value
    this.updateCellStatus = new function (y, x) {
        // Check if the cell is available
        if (this.board[y][x] >= 2){
            // if not, say this to the user
            console.log ("Cell already chosen. Please click on another cell");
        } else {
            // if still available, update from empty (0) or undamaged ship (1) to respectively miss (2) and hit (3)
            this.board[y][x] += 2;
            // if it was a hit, increment the hitcount
            if (this.board[y][x] === 3) {
                hitCount++;
            }
        }
    }

    // get the status of a cell, given it's y and x value
    this.getCellStatus = new function (y, x) {
        return this.board[y][x];
    }

    // represents the number of hits on the player's ships
    this.hitCount = 0;

    // returns true if the opponent sank all ships of the player
    this.hasLost = new function () {
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
}

// creates a table that represents the gameboard
function createTable(destination) {
    var tbl = document.createElement("table");
    var tblbody = document.createElement("tbody");
    
    // make the grid rows
    for(var y = 0; y < 10; y++) {
        var row = document.createElement("tr");                                                
        // make the grid columns
        for(var x = 0; x < 10; x++) {
            var cell = document.createElement("td");
            cell.setAttribute("data-y", y);
            cell.setAttribute("data-x", x);

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