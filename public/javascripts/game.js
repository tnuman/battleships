var main = function() {
    createTable(document.getElementById("gameboardYou"));
    createTable(document.getElementById("gameboardOpp"));
}

$(document).ready(main);

var game = function(gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;                    
    this.gameState = "0 JOINT";
}


var gameBoard = function()  {
    /* 10x10 array that represents the status of each square
    0 = empty, 1 = undamaged ship, 2 = miss, 3 = hit  
    */
    this.boardStatus = [
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
    this.changeStatus = new function (row, column, number) {
        this.boardStatus[row][column] = number;
    }
    this.getStatus = new function (row, column, number) {
        return this.gameBoard[row][column];
    }
}

var ship = function(length) {
    this.length = length;
    this.isSunk = false;

    // function to sink the ship
    var sink = function() {
        this.isSunk = true;
    }
}

function createTable(destination) {
    var tbl = document.createElement("table");
    var tblbody = document.createElement("tbody");
    
    // make the grid rows
    for(var y = 0; y < 10; y++) {
        var row = document.createElement("tr");                                                
        // make the grid columns
        for(var x = 0; x < 10; x++) {
            var cell = document.createElement("td");
            cell.setAttribute("data-x", x);
            cell.setAttribute("data-y", y);

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