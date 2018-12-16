var ship = function (length) {
    this.length = length;
    this.hits = 0;
    this.coveredCells = [];
    this.addCell = function (row, col) {
        if (this.coveredCells) {
            this.coveredCells.push(row + "," + col);
        } else {
            this.coveredCells = [row + "," + col]; // error when pushing values to an empty array, so make a new array for the first cell.
        }
    };
    this.covers = function (row, col) {
        if (!this.coveredCells) return false;
        if (this.coveredCells.includes(row+ "," + col)) {
            return true;
        } else {
            return false;
        }
    };
    this.hasSunk = function() {
        return this.length === this.hits;
    };
};

module.exports = ship;