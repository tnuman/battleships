var express = require("express");
var http = require("http");
var websocket = require("ws");

var indexRouter = require("./routes/index");
var messages = require("./public/javascripts/messages");

var game = require("./gameObject");
var gameStats = require("./stats");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
var server = http.createServer(app);
const wss = new websocket.Server({ server });

app.get("/play", indexRouter);

/*TODO: render splaschreen
app.get("/", (req, res) => {
    res.render("splash.ejs", { templatename: data, templatename: data etc. });
});*/

var websockets = {}; // property: websocket, value: game

// to regularly clean up the web sockets (each minute)
setInterval(function() {
    for(let i in websockets){
        if(websockets.hasOwnProperty(i)){
            let gameObj = websockets[i];
            if(gameObj.finalStatus != null){
                console.log("\tDeleting element "+i);
                delete websockets[i];
            }
        }
    }
}, 60000);

setInterval(function(){
    for(let i in websockets){
        if(websockets.hasOwnProperty(i)){
            let gameObj = websockets[i];
            // if in the setup phase, check if ships are placed
            if(gameObj.transitionStates[gameObj.gameState] === 3){
                if (gameObj.playerA.shipsPlaced === 5 && gameObj.playerB.shipsPlaced === 5) {
                    gameObj.setStatus("A TURN");
                    gameObj.socketA.send(S_YOUR_TURN);
                }
            }
        }
    }     
}, 5000);

var currentGame = new game(gameStats.gamesStarted++);
console.log(gameStats.gamesStarted);
var connectionID = 0;//each websocket receives a unique ID

wss.on("connection", function connection(ws) {
    // add the connected player
    let con = ws; 
    con.id = connectionID++;
    currentGame.addPlayer(con);
    websockets[con.id] = currentGame;

    console.log("Player %s placed in game %s", con.id, currentGame.id);

    /*
     * if the current game has two players, inform the players and create a new game for the next player(s) to connect
     */ 
    console.log(currentGame.hasTwoConnectedPlayers());

    if (currentGame.hasTwoConnectedPlayers()) {
        console.log("Initializing game %s", currentGame.id);
        currentGame.setStatus("SETUP");
        currentGame.socketA.send(messages.S_PLACE_SHIP);
        currentGame.socketB.send(messages.S_PLACE_SHIP);

        currentGame = new game(gameStats.gamesInitialized++);
    }

    /*
     * Message coming in from a player:
     * 1. Placed ships
     * 2. Guessed cell     
     */
    con.on("message", function incoming(message) {
        
        let msg = JSON.parse(message);

        let gameObj = websockets[con.id];
        let isPlayerA = (gameObj.socketA === con) ? true : false;

        // check if the sender of the message was player A
        if(isPlayerA) {
            if(msg.type === messages.T_SHIP_PLACED) {
                gameObj.playerA.placeShip(msg.row, msg.col);

                // tell player A to update its own board
                let messageToA = messages.O_UPDATE_YOU;
                messageToA.board = gameObj.playerA.board;
                gameObj.socketA.send(JSON.stringify(messageToA));
            }
            if(msg.type === messages.T_GUESS) {
                // process the guess of player A into the board of player B 
                gameObj.playerB.updateCellStatus(msg.row, msg.col);

                // tell player A to update its opponents board
                let messageToA = messages.O_UPDATE_OPPONENT;
                messageToA.board = gameObj.playerB.board;
                messageToA.shipsLeft = gameObj.playerB.shipsLeft;
                gameObj.socketA.send(JSON.stringify(messageToA));

                // tell player B to update its own board
                let messageToB = messages.O_UPDATE_YOU;
                messageToB.board = gameObj.playerB.board;
                messageToB.shipsLeft = gameObj.playerB.shipsLeft;
                gameObj.socketB.send(JSON.stringify(messageToB));

                // Check if all the ships of player B have sunk; if true: player A won
                if (playerB.hasLost()) {
                    gameObj.setStatus("A WON");
                    
                    // tell player A it won (data === true)
                    let messageToA = messages.O_GAME_OVER;
                    messageToA.data = true;
                    gameObj.socketA.send(JSON.stringify(messageToA));

                    // tell player B it lost (data === false)
                    let messageToB = messages.O_GAME_OVER;
                    messageToB.data = false;
                    gameObj.socketB.send(JSON.stringify(messageToB));
                } 
                // else the game continues; tell player B it's their turn 
                else {
                    gameObj.setStatus("B TURN");
                    gameObj.socketB.send(S_YOUR_TURN);
                }
            }            
        }

        // else the sender of the message was player B
        else {
            if(msg.type === messages.T_SHIP_PLACED) {
                gameObj.playerB.placeShip(msg.row, msg.col);

                // tell player B to update its own board
                let messageToB = messages.O_UPDATE_YOU;
                messageToB.board = gameObj.playerB.board;
                gameObj.socketB.send(JSON.stringify(messageToB));
            }
            if(msg.type === messages.T_GUESS) {
                // process the guess of player B into the board of player A
                gameObj.playerA.updateCellStatus(msg.row, msg.col);

                // tell player B to update its opponents board
                let messageToB = messages.O_UPDATE_OPPONENT;
                messageToB.board = gameObj.playerA.board;
                messageToB.shipsLeft = gameObj.playerA.shipsLeft;
                gameObj.socketB.send(JSON.stringify(messageToB));

                // tell player A to update its own board
                let messageToA = messages.O_UPDATE_YOU;
                messageToA.board = gameObj.playerA.board;
                messageToA.shipsLeft = gameObj.playerA.shipsLeft;
                gameObj.socketA.send(JSON.stringify(messageToA));
                
                // Check if all the ships of player A have sunk
                if (playerA.hasLost()) {
                    gameObj.setStatus("B WON");
                    
                    // tell player A it lost (data === false)
                    let messageToA = messages.O_GAME_OVER;
                    messageToA.data = false;
                    gameObj.socketA.send(JSON.stringify(messageToA));
                    
                    // tell player B it won (data === true)
                    let messageToB = messages.O_GAME_OVER;
                    messageToB.data = true;
                    gameObj.socketB.send(JSON.stringify(messageToB));
                } 
                // else the game continues; tell player A it's their turn
                else {
                    gameObj.setStatus("A TURN");
                    gameObj.socketA.send(S_YOUR_TURN);
                }
            } 
        }                     

    });

    con.on("close", function (code) {
        
        console.log(con.id + " disconnected");
        // code 1001 = closing initiated by the client
        if (code == "1001") {
            // try to abort the game, else the game is already completed
            let gameObj = websockets[con.id];
            gameStats.shipsSunk += 10 - gameObj.playerA.shipsLeft - gameObj.playerB.shipsLeft;

            if (gameObj.isValidTransition(gameObj.gameState, "ABORTED")) {
                gameObj.setStatus("ABORTED"); 

                /*
                 * determine whose connection remains open;
                 * close it
                 */
                try {
                    gameObj.socketA.close();
                    gameObj.socketA = null;
                }
                catch(e){
                    console.log("Player A closing: "+ e);
                }

                try {
                    gameObj.socketB.close(); 
                    gameObj.socketB = null;
                }
                catch(e){
                    console.log("Player B closing: " + e);
                }                
            }
            
        }
    });

});

server.listen(port);

module.exports = app;
