// NOG AANPASSEN VOOR ONZE GAME

(function(exports){

    /*
     * Server to client: abort game (if one of the players has left) 
     */
    exports.T_GAME_ABORTED = "GAME-ABORTED";
    exports.O_GAME_ABORTED = {                          
        type: exports.T_GAME_ABORTED 
    };
    exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);

    /*
     * Server to client: place your ships
     */
    exports.T_PLACE_SHIP = "PLACE-SHIP";
    exports.O_PLACE_SHIP = {
        type: exports.T_PLACE_SHIP
    };
    exports.S_CHOOSE = JSON.stringify(exports.O_CHOOSE);

    /*
     * Client to server: placed a ship
     */ 
    exports.T_SHIP_PLACED = "SHIP_PLACED";
    exports.O_SHIP_PLACED = {
        type: exports.T_SHIP_PLACED,
        row: null,
        col: null
    };
    //exports.S_SHIP_PLACED does not exist, as data needs to be set

    /*
    / Server to client: your turn to make a guess
    */
    exports.T_YOUR_TURN = "YOUR-TURN"
    exports.O_YOUR_TURN = {
        type: exports.T_YOUR_TURN
    };
    exports.S_YOUR_TURN = JSON.stringify(O_YOUR_TURN);
    
    /* 
     * Client to server: guessed cell 
     */
    exports.T_GUESS = "GUESS";         
    exports.O_GUESS = {
        type: exports.GUESS,
        row: null,
        col: null
    };
    //exports.S_MAKE_A_GUESS does not exist, as data needs to be set

    /*
    / Server to client: update your opponent's table
    */
    exports.T_UPDATE_OPPONENT = "UPDATE-OPPONENT";
    exports.O_UPDATE_OPPONENT = {
        type: T_UPDATE_OPPONENT,
        data: null
    }; 
    //exports.S_UPDATE_OPPONENT does not exist, as data needs to be set

    /*
    / Server to client: update your table
    */
    exports.T_UPDATE_YOU = "UPDATE-YOU";
    exports.O_UPDATE_YOU = {
       type: T_UPDATE_YOU,
       data: null
    };
    //exports.S_UPDATE_YOU does not exist, as data needs to be set     
    
    /* 
     * Server to Player A & B: game over with result won/loss 
     */
    exports.T_GAME_OVER = "GAME-OVER";              
    exports.O_GAME_OVER = {
        type: exports.T_GAME_OVER,
        data: null
    };
    //exports.S_GAME_OVER does not exist, as data needs to be set

}(typeof exports === "undefined" ? this.Messages = {} : exports));
//if exports is undefined, we are on the client; else the server