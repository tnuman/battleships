var express = require("express");
var http = require("http");
var websocket = require("ws");

var indexRouter = require("./routes/index");
var messages = require("./public/javascripts/messages");

var game = require("./public/javascripts/gameObject");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);

app.get("/play", indexRouter);

/*TODO: render splaschreen
app.get("/", (req, res) => {
    res.render("splash.ejs", { templatename: data, templatename: data etc. });
});*/

module.exports = app;
