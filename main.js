const { app, BrowserWindow } = require('electron')

process.env.NODE_ENV = "development"

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Machination',
        height: 1200,
        width: 800,
        contextIsolation: true,
        resizable: isDev ? true : false
    })

    mainWindow.loadFile('./app/index.html')
}

app.on('ready', createMainWindow)
app.allowRendererProcessReuse = true