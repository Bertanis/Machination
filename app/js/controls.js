const mainWindow = remote.getCurrentWindow()

const ControlUtils = {
    setupWindowControls: () => {
        $('#minimize_button').on('click', () => {
            mainWindow.minimize()
        })
        $('#maximize_button').on('click', () => {
            mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
        })
        $('#close_button').on('click', () => {
            mainWindow.close();
        })
    },

    addSideMenuButton: (imageLink, name, click) => {
        let button = $(`<img id="${name}" />`)
        button.attr('src', imageLink)
        button.addClass('menu')
        button.on('click', click)
        $('.selectors').append(button)
    }
}