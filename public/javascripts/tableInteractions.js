// creates a table that represents the gameboard
function createTable(destination, player) {
    var tbl = document.createElement("table");
    var tblbody = document.createElement("tbody");

    for(let y = 0; y < 10; y++) {
        var row = document.createElement("tr");                                                
        for(let x = 0; x < 10; x++) {
            var cell = document.createElement("td");
            cell.setAttribute("row", y);
            cell.setAttribute("col", x);
            cell.setAttribute("class", "empty");
            cell.setAttribute("id", player + String(y) + String(x));
            
            row.appendChild(cell);
        }
        tblbody.appendChild(row);
    }
    tbl.appendChild(tblbody);
    destination.appendChild(tbl);
}

function updateTableCell(cell, value) {
    if(value === 0) {
        cell.attr("class", "empty");
    }
    if(value === 1) {
        cell.attr("class", "ship");
    }
    if(value === 2) {
        cell.attr("class", "miss");
    }
    if(value === 3) {
        cell.attr("class", "hit");
    }
    if(value === 4) {
        cell.attr("class", "sunk");
    }
}

function updateYourTable(board) {
    for(let y = 0; y < 10; y++) {
        for(let x = 0; x < 10; x++) {
            var element = "#Y" + String(y) + String(x);
            updateTableCell($(element), board[y][x]);
        }
    }    
}

function updateOppTable(board) {
    for(let y = 0; y < 10; y++) {
        for(let x = 0; x < 10; x++) {
            if (board[y][x] != 1) {
                var element = "#O" + String(y) + String(x);
                updateTableCell($(element), board[y][x]);
            }
        }
    }    
}
