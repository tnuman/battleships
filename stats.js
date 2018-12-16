var gameStats = {
    since : Date.now(),     /* keeps track of when this object was created */
    gamesStarted : 0,       /* number of games started */
    gamesOngoing : 0,       /* number of games currently ongoing */
    shipsSunk : 0           // total number of ships that have sunk
};

module.exports = gameStats;