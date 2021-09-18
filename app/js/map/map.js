var map = {
    size: 5,
    tsize: 64,
    grid: [],
    resize(newSize) {
        this.size = newSize + 1;
        $('#map_canvas').attr('width', map.getWidth()).attr('height', map.getHeight());
        this._generateGridTiles();
    },
    rowFromX(x) {
        return Math.floor(x / this.tsize);
    },
    colFromY(y) {
        return Math.floor(y / this.tsize);
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

var arrows = {
    NONE: -1,
    START: 0,
    S_RIGHT: 1,
    S_LEFT: 2,
    S_DOWN: 3,
    S_UP: 4,
    DR_CORNER: 5,
    DL_CORNER: 6,
    UL_CORNER: 7,
    UR_CORNER: 8,
    Y_THROUGH: 9,
    X_THROUGH: 10,
    END_RIGHT: 11,
    END_LEFT: 12,
    END_UP: 13,
    END_DOWN: 14,
    vertices: [],
    lastPos: { x: -1, y: -1, type: -1 },
    goto: function (x, y) {
        if (y == -1 || y > map.size + 1 || x == -1 || x > map.size + 1) {

        } else if (this.lastPos.type == this.NONE) {
            var newPos = { row: y, col: x, type: this.START };
            this.sections.push(newPos);
            this.lastPos = newPos;
        } else if (Math.abs(y - this.lastPos.row) > 1) {
            console.error("Can't place next section more than one row away");
        } else if (Math.abs(x - this.lastPos.col) > 1) {
            console.error("Can't place next section more than one column away");
        } else if (y > this.lastPos.row) {
            var newPos = { row: y, col: x, type: this.END_UP };
            this.sections[this.sections.length - 1];
        }
    },
    isAbove: function (x1, y1, x2, y2) {

    },
    clear: function () {
        this.sections = [];
    }
}

map.resize(15);

Game.load = function () {
    return [
        Loader.loadImage('gridTiles', './assets/tilesets/grid_tiles.png'),
        Loader.loadImage('tokens', './assets/tilesets/test_tokens.png'),
        Loader.loadImage('arrows', './assets/tilesets/arrows.png')
    ];
};

Game.init = function () {
    this.gridAtlas = Loader.getImage('gridTiles');
    this.tokenAtlas = Loader.getImage('tokens');
    this.arrowAtlas = Loader.getImage('arrows');
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

Game.drawArrow = function () {
    for (var section in arrowLayer.sections) {
        this.ctx.drawImage(
            this.arrowAtlas,
            (token.index - 1) * map.tsize,
            0,
            map.tsize,
            map.tsize,
            section.col * map.tsize,
            section.row * map.tsize,
            map.tsize,
            map.tsize
        );
    }
}

Game.render = function () {
    this.drawGrid();
    this.drawTokens();
    this.drawArrow();
}