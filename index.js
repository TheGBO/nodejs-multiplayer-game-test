const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const socketIo = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

app.set('view engine', 'html');
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname,'/public')));
app.use('/', (req, res) => {
    res.render('index.html');
})

const io = socketIo.listen(server);
server.listen(process.env.PORT);
//game 

function addPlayer(id){
    return game.players[id] = {
        x: Math.floor(Math.random() * game.settings.worldW),
        y: Math.floor(Math.random() * game.settings.worldH),
        health: 100,
        username: `Player${Math.floor(Math.random() * 999999)}`,
        color: "#"+Math.floor(Math.random()*16777215).toString(16)
    }
}

function removePlayer(id){
    delete game.players[id];
}

var game = {
    settings: {
        playerW: 30,
        playerH: 30,
        worldW: 500,
        worldH: 500
    },
    players: {},
    addPlayer: addPlayer,
    removePlayer: removePlayer,
    updateGame: () => {io.emit("game-state", game);},

}


io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log("> Player Disconnected " + socket.id)
        game.removePlayer(socket.id);
        socket.broadcast.emit("player-remove", socket.id)
    })
    console.log("> New Client " + socket.id);
    game.addPlayer(socket.id);
    game.updateGame();
});



