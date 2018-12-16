var ship = require("./ship");

// represents a player of this game
var player = function()  {
    
    // represents the number of hits on the player's ships
    this.hitCount = 0;
    
    // represents the number of ships the player has placed
    this.shipsPlaced = 0;
    
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
    ];

    // ships of the player
    this.ships = [new ship(1), new ship(2), new ship(3), new ship(4), new ship(5)];
    
    // return the number of ships that haven't sunken yet
    this.shipsLeft = function() {
        var count = 0;
        for (let i = 0; i < this.ships.length; i++) {
            if (!(this.ships[i].hasSunk())) {
                count++;
            }
        }
        return count;
    };

    // allows to place a ship on the board, given it's leftmost/top coordinate, length and orientation
    this.placeShip = function (row, col, horizontal) {
        if(this.shipsPlaced <= 4) {
            if(horizontal) {                    // ship needs to be placed horizontally
                // check if the ship fits on the gameboard and all covered cells are still empty
                for(let i = 0; i < (this.shipsPlaced + 1); i++) {
                    if (((parseInt(col) + i) >= 10) || this.board[row][parseInt(col) + i] >= 1) {
                        return false;
                    }
                }
                // add the ship to the gameboard and the covered cells to the ship
                for(let x = 0; x < (this.shipsPlaced + 1); x++) {
                    this.board[row][parseInt(col) + x] = 1;
                    var aShip = this.ships[this.shipsPlaced];
                    aShip.addCell(row, (parseInt(col) + x));                
                }
            } else {                            // ship needs to be placed vertically
                // check if the ship fits on the gameboard and all covered cells are still empty
                for(let i = 0; i < (this.shipsPlaced + 1); i++) {
                    if (((parseInt(row) + i) >= 10) || this.board[parseInt(row) + i][col] >= 1) {
                        return false;
                    }
                }
                // add the ship to the gameboard and the covered cells to the ship
                for(let x = 0; x < (this.shipsPlaced + 1); x++) {
                    this.board[parseInt(row) + x][col] = 1;
                    var aShip = this.ships[this.shipsPlaced];
                    aShip.addCell(parseInt(row) + x, col);                
                }
            }
            this.shipsPlaced++;
            return true;
        }
        
    };

    // allows to update the status of a cell, given it's row and col value
    this.updateCellStatus = function (row, col) {

        //Update from empty (0) or undamaged ship (1) to respectively miss (2) and hit (3)
        if (this.board[row][col] <= 1) {
        this.board[row][col] += 2;
        // if it was a hit, increment the hitcount
            if (this.board[row][col] === 3) {
                this.hitCount++;
                
                // check is the ship is sunken
                for (let i = 0; i < this.ships.length; i++) {
                    var aShip = this.ships[i];
                    if (aShip.covers(row, col)) {
                        aShip.hits++;
                        if (aShip.hasSunk() === true){
                            for (let j = 0; j < aShip.length; j++) {
                                var cell = aShip.coveredCells[j].split(",");       // an array with row and col value
                                this.board[cell[0]][cell[1]] = 4;
                            }
                        }
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    };

    // get the status of a cell, given it's row and col value
    this.getCellStatus = function (row, col) {
        return this.board[row][col];
    };

        // returns true if the opponent sank all ships of the player
    this.hasLost = function () {
        // when there are 15 hits on the players ships (total length of all ships), the player has lost
        return this.hitCount === 15;
    };
};

module.exports = player;