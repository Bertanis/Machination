var map = {
    cols: 8,
    rows: 8,
    tsize: 64,
    tiles: [
        1, 3, 3, 3, 1, 1, 3, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 2, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 2, 1, 1, 1, 1,
        1, 1, 1, 1, 2, 1, 1, 1,
        1, 1, 1, 1, 2, 1, 1, 1,
        1, 1, 1, 1, 2, 1, 1, 1
    ],
    getTile: function (col, row) {
        return this.tiles[row * map.cols + col];
    }
};

Game.load = function () {
    console.log("got here");
    return [
        Loader.loadImage('tiles', './assets/tilesets/test_set.png')
    ];
};

Game.init = function () {
    this.tileAtlas = Loader.getImage('tiles');
};

Game.update = function (delta) {

};

Game.render = function () {
    for (var c = 0; c < map.cols; c++) {
        for (var r = 0; r < map.rows; r++) {
            var tile = map.getTile(c, r);
            if (tile !== 0) {
                this.ctx.drawImage(
                    this.tileAtlas,
                    (tile - 1) * map.tsize,
                    0,
                    map.tsize,
                    map.tsize,
                    c * map.tsize,
                    r * map.tsize,
                    map.tsize,
                    map.tsize
                );
            }
        }
    }
}