// represents a player of this game
var player = function(name)  {
    this.name = name;
    
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
    ]

    this.ships = [new ship(1), new ship(2), new ship(3), new ship(4), new ship(5)]

    // place a ship on the board, given it's leftmost coordinate and length
    this.placeShip = function (row, col, length) {
        if(this.shipsPlaced <= 4) {
            for(let i = 0; i < length; i++) {
                if (((parseInt(col) + i) >= 10) || this.board[row][parseInt(col)+i] >= 1) {
                    return false;
                }
            }
            for(let x = 0; x < length; x++) {
                this.board[row][parseInt(col) + x] = 1;
                var aShip = this.ships[length - 1];
                aShip.addCell(row, (parseInt(col) + x));                
            }
            this.shipsPlaced++;
            //console.log(this.board);
            return true;
        }
        
    }

    // update the status of a cell, given it's row and col value
    this.updateCellStatus = function (row, col) {
        // Update to sunken part of a ship if this function is called with a cell with status 3
        if (this.board[row][col] === 3){
            this.board[row][col]++;
        }

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
                        console.log(aShip);
                        if (aShip.isSunk() === true){
                            for (let j = 0; j < aShip.length; j++) {
                                var cell = aShip.coveredCells[j].split(",");       // an array with row and col value
                                this.updateCellStatus(cell[0], cell[1]);
                            }
                        }
                    }
                }
            }
        }
    }

    // get the status of a cell, given it's row and col value
    this.getCellStatus = function (row, col) {
        return this.board[row][col];
    }

        // returns true if the opponent sank all ships of the player
    this.hasLost = function () {
        // when there are 15 hits on the players ships (total length of all ships), the player has lost
        return this.hitCount === 15;
    }
}