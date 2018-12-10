var express = require("express");
var router = express.Router();

//Go to splashscreen
router.get("/", function (req, res) {
    res.sendFile("splash.ejs", {root: "./public"});
});

/* Go to gamescreen when pressing the play button */
router.get("/play", function(req, res) {
    res.sendFile("game.html", {root: "./public"});
});

module.exports = router;

