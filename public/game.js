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


