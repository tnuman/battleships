var express = require("express");
var http = require("http");
var websocket = require("ws");

var indexRouter = require("./routes/index");
var messages = require("./public/javascripts/messages");

var game = require("./public/javascripts/gameObject");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
var server = http.createServer(app);
const wss = new websocket.Server({ server });

app.get("/play", indexRouter);

var websockets = {}; // property: websocket, value: game

// to regularly clean up the web sockets (each minute)
setInterval(function() {
    for(let i in websockets){
        if(websockets.hasOwnProperty(i)){
            let aGame = websockets[i];
            if(gameObj.finalStatus != null){
                delete websockets[i];
            }
        }
    }
}, 60000);

/*TODO: render splaschreen
app.get("/", (req, res) => {
    res.render("splash.ejs", { templatename: data, templatename: data etc. });
});*/

server.listen(port);

module.exports = app;
