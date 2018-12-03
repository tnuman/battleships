// creates a table that represents the gameboard
function createTable(destination, player) {
    var tbl = document.createElement("table");
    var tblbody = document.createElement("tbody");
    
    // make the grid rows
    for(let y = 0; y < 10; y++) {
        var row = document.createElement("tr");                                                
        // make the grid columns
        for(let x = 0; x < 10; x++) {
            var cell = document.createElement("td");
            /* heb ze row and col genoemd, want y en x waren een beetje verwarrend 
            (hoe meer naar beneden hoe groter de y werd, (y,x) i.p.v. (x,y) omgewisseld etc.)
            haal comment maar weg als je gelezen hebt*/
            cell.setAttribute("row", y);
            cell.setAttribute("col", x);
            cell.setAttribute("class", "empty");
            cell.setAttribute("id", player + String(y) + String(x));

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

function updateTableCell(cell, player) {
    var status = player.getCellStatus(cell.attr("row"), cell.attr("col"));
    console.log(player.getCellStatus(cell.attr("row"), cell.attr("col")));
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
            // updateTableCell(document.getElementById(prefix + String(y) + String(x)), player);
            var element = "#Y" + String(y) + String(x);
            updateTableCell($(element), player)
        }
    }    
}