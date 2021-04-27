var Game = {};

Game.run = function (context) {
    this.ctx = context;
    this._previousElapsed = 0;

    var p = this.load();
    Promise.all(p).then(function (loaded) {
        this.init();
        window.requestAnimationFrame(this.tick);
    }.bind(this));
}

var shouldLog = true;

Game.tick = function (elapsed) {
    window.requestAnimationFrame(this.tick);

    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25);
    this._previousElapsed = elapsed;

    this.update(delta);
    this.render();
}.bind(Game);

Game.update = function (delta) { };
Game.render = function () { };

window.onload = function () {
    var context = document.getElementById('map_canvas').getContext('2d');
    Game.run(context);
}