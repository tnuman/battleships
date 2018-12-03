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

function updateTableCell(cell, player) {
    var status = player.getCellStatus(cell.attr("row"), cell.attr("col"));
    //console.log(player.getCellStatus(cell.attr("row"), cell.attr("col")));
    if(status === 0) {
        cell.attr("class", "empty");
    }
    if(status === 1) {
        cell.attr("class", "ship");
    }
    if(status === 2) {
        cell.attr("class", "miss");
    }
    if(status === 3) {
        cell.attr("class", "hit");
    }
    if(status === 4) {
        cell.attr("class", "sunk");
    }
}

function updateYourTable(player) {
    for(let y = 0; y < 10; y++) {
        for(let x = 0; x < 10; x++) {
            var element = "#Y" + String(y) + String(x);
            updateTableCell($(element), player);
        }
    }    
}

function updateOppTable(player) {
    for(let y = 0; y < 10; y++) {
        for(let x = 0; x < 10; x++) {
            var element = "#O" + String(y) + String(x);
            updateTableCell($(element), player);
        }
    }    
}
