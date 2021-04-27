var map = {
    size: 5,
    tsize: 64,
    tiles: [],
    resize(newSize) {
        this.size = newSize + 1;
        $('#map_canvas').attr('width', map.getWidth()).attr('height', map.getHeight());
        this._generateGridTiles();
    },
    getTile: function (col, row) {
        return this.tiles[row * map.size + col];
    },
    getWidth: function () {
        return this.size * this.tsize;
    },
    getHeight: function () {
        return this.size * this.tsize;
    },
    _generateGridTiles: function () {
        this.tiles = [];
        for (var r = 0; r < map.size; r++) {
            for (var c = 0; c < map.size; c++) {
                if (r < map.size - 1) {
                    if (c < map.size - 1) {
                        this.tiles.push(1);
                    } else {
                        this.tiles.push(2);
                    }
                } else {
                    if (c < map.size - 1) {
                        this.tiles.push(3);
                    } else {
                        this.tiles.push(0);
                    }
                }
            }
        }
    }
};
map.resize(15);

Game.load = function () {
    return [
        Loader.loadImage('tiles', './assets/tilesets/grid_tiles.png')
    ];
};

Game.init = function () {
    this.tileAtlas = Loader.getImage('tiles');
};

Game.update = function (delta) {

};

Game.drawBaseGrid = function () {

}

Game.drawLayer = function (zInd) {

}

Game.render = function () {
    for (var c = 0; c < map.size; c++) {
        for (var r = 0; r < map.size; r++) {
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