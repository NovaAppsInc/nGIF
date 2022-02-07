// Modules to control application life and create native browser window
const { app, BrowserWindow ,globalShortcut, ipcMain, Menu, nativeTheme } = require('electron');
const path = require('path');
const ipc = ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let verWin;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 855,
        height: 655,
        minWidth: 855,
        minHeight: 655,
        frame: false,
        darkTheme: true,
        show: false,
        thickFrame: true,
        backgroundColor: '#222222',
        webPreferences: {
            nodeIntegration: true,
            devTools: false,
            contextIsolation: false
        },
        scrollBounce: true,
        icon: "./icon.ico"
    });

    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
          nativeTheme.themeSource = 'light'
        } else {
          nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    });
    
    ipcMain.handle('dark-mode:system', () => {
      nativeTheme.themeSource = 'system'
    });

    ipc.on("closeApp", () => {
        mainWindow.close();
    });
    ipc.on("minApp", () => {
        mainWindow.minimize();
    });
    
    ipc.on("maxApp", () => {
        if(mainWindow.isMaximized()) {
            mainWindow.webContents.send("changeIr");
            mainWindow.restore();
        } else {
            mainWindow.webContents.send("changeImx");
            mainWindow.maximize();
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

    mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.show();
    });
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    });
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow, () => {
    // Menu.setApplicationMenu(null)
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// app.whenReady().then(() => {
//     globalShortcut.register('Shift+CommandOrControl+I', () => {
//         return null;
//     });
// })