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
    ]

    // place a ship on the board, given it's leftmost coordinate and length
    this.placeShip = function (row, col, length) {
        if(this.shipsPlaced <= 4) {
            for(let i = 0; i < length; i++) {
                if (((parseInt(col) + i) > 10) || this.board[row][parseInt(col)+i] >= 1) {
                    console.log(false);
                    return false;
                }
            }
            for(let x = 0; x < length; x++) {
                console.log("setting to 1");
                this.board[row][parseInt(col) + x ] = 1;
                //console.log(this.board[row][col + x]);                
            }
            this.shipsPlaced++;
            console.log(this.board);
            return true;
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
                this.hitCount++;
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