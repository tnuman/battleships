var ship = function (length) {
    this.length = length;
    this.hits = 0;
    this.coveredCells = [];
    this.addCell = function (row, col) {
        if (this.coveredCells) {
            this.coveredCells.push(row + "," + col); // row and col handled as a string (concatenated), no addition
        } else {
            this.coveredCells = [row + "," + col]; // een lege array kun je niet pushen, 
                                            // dus als de array nog leeg is moet je een nieuw array maken met 1 element
        }
    }
    this.covers = function (row, col) {
        if (!this.coveredCells) return false;
        if (this.coveredCells.includes(row+ "," + col)) {
            return true;
        } else {
            return false;
        }
    }
    this.hasSunk = function() {
        return this.length === this.hits;
    }
}

module.exports = ship;