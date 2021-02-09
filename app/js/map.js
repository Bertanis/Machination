var setupCanvas = () => {
    var canvas = document.getElementById('map_canvas')
    var gl = canvas.getContext('webgl')

    if (!gl) {
        console.log("App does not support WebGL")
    }

    // var mapContainer = $('#map_container')
    // canvas.width = mapContainer.width
    // canvas.height = mapContainer.height

    canvas.width = 800
    canvas.height = 800

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0.8, 0.8, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

}