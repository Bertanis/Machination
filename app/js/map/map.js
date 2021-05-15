var map = {
    size: 5,
    tsize: 64,
    grid: [],
    resize(newSize) {
        this.size = newSize + 1;
        $('#map_canvas').attr('width', map.getWidth()).attr('height', map.getHeight());
        this._generateGridTiles();
    },
    getGridTile: function (col, row) {
        return this.grid[row * map.size + col];
    },
    getWidth: function () {
        return this.size * this.tsize;
    },
    getHeight: function () {
        return this.size * this.tsize;
    },
    _generateGridTiles: function () {
        this.grid = [];
        for (var r = 0; r < map.size; r++) {
            for (var c = 0; c < map.size; c++) {
                if (r < map.size - 1) {
                    if (c < map.size - 1) {
                        this.grid.push(1);
                    } else {
                        this.grid.push(2);
                    }
                } else {
                    if (c < map.size - 1) {
                        this.grid.push(3);
                    } else {
                        this.grid.push(0);
                    }
                }
            }
        }
    }
};

var tokenLayer = {
    tokens: {},
    addToken: function (name, index, row, col) {
        this.tokens[name] = {
            "index": index,
            "position": {
                'row': row,
                'col': col
            }
        };
    },
    removeToken: function (name) {
        delete this.tokens[name];
    },
    moveToken: function (name, row, col) {
        this.tokens[name].position.row = row;
        this.tokens[name].position.col = col;
    },
    changeToken: function (name, index) {
        this.tokens[name].index = index;
    }
};

map.resize(15);

Game.load = function () {
    return [
        Loader.loadImage('gridTiles', './assets/tilesets/grid_tiles.png'),
        Loader.loadImage('tokens', './assets/tilesets/test_tokens.png')
    ];
};

Game.init = function () {
    this.gridAtlas = Loader.getImage('gridTiles');
    this.tokenAtlas = Loader.getImage('tokens');
};

Game.update = function (delta) {

};

Game.drawGrid = function () {
    for (var c = 0; c < map.size; c++) {
        for (var r = 0; r < map.size; r++) {
            var tile = map.getGridTile(c, r);
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

Game.drawTokens = function () {
    for (var tokenName in tokenLayer.tokens) {
        var token = tokenLayer.tokens[tokenName];
        this.ctx.drawImage(
            this.tokenAtlas,
            (token.index - 1) * map.tsize,
            0,
            map.tsize,
            map.tsize,
            token.position.col * map.tsize,
            token.position.row * map.tsize,
            map.tsize,
            map.tsize
        );
    }
}

Game.render = function () {
    this.drawGrid();
    this.drawTokens();
}