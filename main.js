const { app, BrowserWindow, Menu } = require('electron')

process.env.NODE_ENV = "development"

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Machination',
        height: 900,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        },
        contextIsolation: true,
        resizable: isDev ? true : false
    })

    mainWindow.loadFile('./app/index.html')
}

app.on('ready', () => {
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    mainWindow.on('ready', () => mainWindow = null)
})

const menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                click: () => app.quit()
            }
        ]
    }
]

app.on('window-all-closed', () => {
    if (isMac) {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
})

app.allowRendererProcessReuse = true