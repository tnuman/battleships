// represents a game, the server will store an array of games
var game = function(gameID) {
    // the websockets of the players
    this.playerA = null;
    this.playerB = null;

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