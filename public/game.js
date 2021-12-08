var canvas = document.getElementById("gameCanvas");
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "red";
var socket = io();
var gamestate

socket.on('game-state', (game) => {
    console.log(game);
    gamestate = game;

    function renderGame(){
        ctx.fillStyle = "white"
        ctx.fillRect(0,0,canvas.width, canvas.height)
        for(player in gamestate.players){
            ctx.fillStyle = gamestate.players[player].color;
            ctx.fillRect(gamestate.players[player].x, gamestate.players[player].y, gamestate.settings.playerW, gamestate.settings.playerH)
            ctx.font = '15px Arial';
            ctx.fillText(gamestate.players[player].username, gamestate.players[player].x -25, gamestate.players[player].y -5);
        }
        requestAnimationFrame(renderGame)
    }
    renderGame();
});

socket.on('player-remove', (id) => {
    delete gamestate.players[id]
})

function movePlayer(dir){
    socket.emit('move-player', dir);
}

document.addEventListener('keydown', (e) => {
    if(e.key == 'w'){
        movePlayer('up');
    }
    if(e.key == 'a'){
        movePlayer('left');
    }
    if(e.key == 's'){
        movePlayer('down');
    }
    if(e.key == 'd'){
        movePlayer('right');
    }
})
