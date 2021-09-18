var Cursor = {
    startX: -1,
    startY: -1,
    curX: -1,
    curY: -1,
    startVector: function (event) {
        this.startX = event.offsetX;
        this.startY = event.offsetY;
        console.log(`x: ${this.startX}, y: ${this.startY}`);
    },
    endVector: function (event) {
        console.log(`x: ${map.rowFromX(event.offsetX)}, y: ${map.colFromY(event.offsetY)}`);
    }
};

var mapCanvas = $('#map_canvas');
mapCanvas.on('mousedown', (event) => {
    Cursor.startVector(event);
});
mapCanvas.on('mouseup', (event) => {
    Cursor.endVector(event);
});