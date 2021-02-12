const { app, BrowserWindow, Menu } = require('electron')

process.env.NODE_ENV = "development"

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow
let aboutWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Machination',
        height: 900,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        contextIsolation: true,
        resizable: isDev ? true : false,
        backgroundColor: 'white'
    })

    mainWindow.loadFile('./app/index.html')
    mainWindow.maximize()
}

function createAboutWindow() {
    aboutWindow = new BrowserWindow({
        title: 'About Machination',
        width: 300,
        height: 300,
        resizable: false,
        backgroundColor: 'white'
    })

    aboutWindow.loadFile('./app/about.html')
}

app.on('ready', () => {
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    mainWindow.on('ready', () => mainWindow = null)
})

const menu = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {
                label: 'About',
                click: createAboutWindow,
            }
        ]
    }] : []),
    {
        role: 'fileMenu'
    },
    ...(!isMac ? [
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click: createAboutWindow
                }
            ]
        }
    ] : []),
    ...(isDev ? [
        {
            label: 'Developer',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { type: 'separator' },
                { role: 'toggledevtools' }
            ]
        }
    ] : [])
]

if (isMac) {
    menu.unshift({ role: 'appMenu' })
}

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