var map = {
    size: 5,
    tsize: 64,
    layerPriority: ["grid", "token"],
    layers: {},
    resize(newSize) {
        this.size = newSize + 1;
        $('#map_canvas').attr('width', map.getWidth()).attr('height', map.getHeight());
        this._generateGridTiles();
    },
    getTile: function (name, col, row) {
        return this.layers[name][row * map.size + col];
    },
    getWidth: function () {
        return this.size * this.tsize;
    },
    getHeight: function () {
        return this.size * this.tsize;
    },
    setLayerTiles: function (name, tiles) {
        this.layers[name] = tiles;
    },
    _generateGridTiles: function () {
        var grid = [];
        for (var r = 0; r < map.size; r++) {
            for (var c = 0; c < map.size; c++) {
                if (r < map.size - 1) {
                    if (c < map.size - 1) {
                        grid.push(1);
                    } else {
                        grid.push(2);
                    }
                } else {
                    if (c < map.size - 1) {
                        grid.push(3);
                    } else {
                        grid.push(0);
                    }
                }
            }
        }
        this.layers["grid"] = grid;
    }
};
map.resize(15);

Game.load = function () {
    return [
        Loader.loadImage('tiles', './assets/tilesets/grid_tiles.png')
    ];
};

Game.init = function () {
    this.gridAtlas = Loader.getImage('tiles');
};

Game.update = function (delta) {

};

Game.drawLayer = function (name) {
    for (var c = 0; c < map.size; c++) {
        for (var r = 0; r < map.size; r++) {
            var tile = map.getTile(name, c, r);
            if (tile !== 0) {
                this.ctx.drawImage(
                    this.gridAtlas,
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

Game.render = function () {
    for (var name in map.layers) {
        this.drawLayer(name);
    }
}