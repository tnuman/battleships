/* 
 In-memory game statistics "tracker".
 As future work, this object should be replaced by a DB backend.
*/

var gameStats = {
    since : Date.now(),     /* since we keep it simple and in-memory, keep track of when this object was created */
    gamesStarted : 0,       /* number of games started */
    gamesOngoing : 0,     /* number of games currently ongoing */
    shipsSunk : 0           // total number of ships that have sunk
};

module.exports = gameStats;