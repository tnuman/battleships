var player = require("./player");

// represents a game, the server will store an array of games
var game = function(gameID) {
    // the websockets of the players
    this.socketA = null;
    this.socketB = null;
    // player objects with game data
    this.playerA = new player();
    this.playerB = new player();
    // game id and state
    this.id = gameID;                    
    this.gameState = "0 JOINT";
    
    /*Maybe we should store the player objects here, so the server has acces to all data and can modify this. 
    Then on the client-side, we should just:
    - catch events and message the server
    -> server will modify the data
    -> server will send message(s) to / calls function of the clients to update their table(cell)s / text fields (like instruction, ships left etc.)
    - listen for messages from the server / execute callback function to update the view

    Then you actually get the MVC structure and I think this is the most practical
    */
};

// states the game can have
game.prototype.transitionStates = {};
game.prototype.transitionStates["0 JOINT"] = 0;
game.prototype.transitionStates["1 JOINT"] = 1;
game.prototype.transitionStates["2 JOINT"] = 2;
game.prototype.transitionStates["SETUP"] = 3; // setup phase: placing the ships
game.prototype.transitionStates["A TURN"] = 4; // A's turn
game.prototype.transitionStates["B TURN"] = 5; // B's turn
game.prototype.transitionStates["A WON"] = 6; 
game.prototype.transitionStates["B WON"] = 7; 
game.prototype.transitionStates["ABORTED"] = 8;

// Indicates the valid transitions
game.prototype.transitionMatrix = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0],   //0 JOINT
    [1, 0, 1, 0, 0, 0, 0, 0, 0],   //1 JOINT
    [0, 0, 0, 1, 0, 0, 0, 0, 1],   //2 JOINT
    [0, 0, 0, 0, 1, 0, 0, 0, 1],   //SETUP
    [0, 0, 0, 0, 0, 1, 1, 0, 1],   //A TURN
    [0, 0, 0, 0, 1, 0, 0, 1, 1],   //B TURN
    [0, 0, 0, 0, 0, 0, 0, 0, 0],   //A WON
    [0, 0, 0, 0, 0, 0, 0, 0, 0],   //B WON
    [0, 0, 0, 0, 0, 0, 0, 0, 0]    //ABORTED
];

// indicates whether the transition from 'from' to 'to' is valid
game.prototype.isValidTransition = function (from, to) {

    var s1, s2;
    if (!game.prototype.isValidState(from)) {
        return false;
    } else {
        s1 = game.prototype.transitionStates[from];
    } 
    if (!game.prototype.isValidState(to)) {
        return false;
    } else {
        s2 = game.prototype.transitionStates[to];
    }
    return (game.prototype.transitionMatrix[s1][s2] > 0);
};

// indicates whether s is a valid state
game.prototype.isValidState = function (s) {
    return (s in game.prototype.transitionStates);
};

// indicates whether the game has a final state
game.prototype.hasFinalState = function () {
    return (this.transitionStates[this.gameState] >= 6);
};

// sets the status of this game to 'to', provided that 'to' is a valid state and the transition is valid
game.prototype.setStatus = function (to) {

    if (game.prototype.isValidState(to) && game.prototype.isValidTransition(this.gameState, to)) {
        this.gameState = to;
        console.log("Game %s: [STATUS] %s", this.id, this.gameState);
    }
    else {
        return new Error("Can't change the game status from %s to %s", this.gameState, to);
    }
};

game.prototype.hasTwoConnectedPlayers = function () {
    return (this.gameState === "2 JOINT");
};

game.prototype.addPlayer = function (p) {

    if (this.gameState != "0 JOINT" && this.gameState != "1 JOINT") {
        return new Error("Can't add a new player, the current state is %s", this.gameState);
    }

    // if setStatus to 1 joint gives an error, the status is already 1 joint, so set to 2 joint
    var error = this.setStatus("1 JOINT");
    if(error instanceof Error){
        this.setStatus("2 JOINT");
    }

    if (this.socketA === null) {
        this.socketA = p;
    } else {
        this.socketB = p;
    }
};

module.exports = game;