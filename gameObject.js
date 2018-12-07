//var player = require("./javascripts/player");

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

    Dan krijg je dus eigenlijk die MVC structuur en is denk ik het meest praktisch
    */
}

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

game.prototype.isValidTransition = function (from, to) {
    
    console.assert(typeof from == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof from);
    console.assert(typeof to == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof to);
    console.assert( from in game.prototype.transitionStates == true, "%s: Expecting %s to be a valid transition state", arguments.callee.name, from);
    console.assert( to in game.prototype.transitionStates == true, "%s: Expecting %s to be a valid transition state", arguments.callee.name, to);


    var s1, s2;
    if (! (from in game.prototype.transitionStates)) {
        return false;
    }
    else {
        s1 = game.prototype.transitionStates[from];
    }

    if (!(to in game.prototype.transitionStates)) {
        return false;
    }
    else {
        s2 = game.prototype.transitionStates[to];
    }

    return (game.prototype.transitionMatrix[s1][s2] > 0);
};

game.prototype.isValidState = function (s) {
    return (s in game.prototype.transitionStates);
};

game.prototype.setStatus = function (w) {

    console.assert(typeof w == "string", "%s: String expected, but got a %s", arguments.callee.name, typeof w);

    if (game.prototype.isValidState(w) && game.prototype.isValidTransition(this.gameState, w)) {
        this.gameState = w;
        console.log("[STATUS] %s", this.gameState);
    }
    else {
        return new Error("Can't change the game status from %s to %s", this.gameState, w);
    }
};

game.prototype.hasTwoConnectedPlayers = function () {
    return (this.gameState == "2 JOINT");
};

game.prototype.addPlayer = function (p) {

    console.assert(p instanceof Object, "%s: Websocket expected, but got a %s", arguments.callee.name, typeof p);

    if (this.gameState != "0 JOINT" && this.gameState != "1 JOINT") {
        return new Error("Can't add a new player, the current state is %s", this.gameState);
    }

    // if setStatus to 1 joint gives an error, the status is already 1 joint, so set to 2 joint
    var error = this.setStatus("1 JOINT");
    if(error instanceof Error){
        this.setStatus("2 JOINT");
    }

    if (this.socketA == null) {
        this.socketA = p;
    } else {
        this.socketB = p;
    }
};

module.exports = game;