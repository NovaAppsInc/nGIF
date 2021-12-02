// Modules to control application life and create native browser window
require('update-electron-app')();
const { app, BrowserWindow, autoUpdater ,globalShortcut, ipcMain} = require('electron');
const path = require('path');
const ipc = ipcMain;

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }
  
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
  })

  autoUpdater.on('error', message => {
    console.error('There was a problem updating the application')
    console.error(message)
  })

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let verWin;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 850,
        height: 650,
        minWidth: 800,
        minHeight: 600,
        frame: false,
        backgroundColor: '#222222',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false,
            preload: path.join(__dirname, 'preload.js'),
        },
        scrollBounce: true,
        icon: "./icon.ico"
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

    function createWindowVer() {
        verWin = new BrowserWindow({
            width: 400,
            height: 300,
            minWidth: 400,
            minHeight: 300,
            frame: false,
            resizable: false,
            backgroundColor: '#222222',
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                devTools: false,
                preload: path.join(__dirname, 'preload.js'),
            },
            scrollBounce: true,
            icon: "./icon.ico"
        });

        ipc.on("closeAppVer", () => {
            verWin.close();
        });

        verWin.loadFile('ver.html');

        // Open the DevTools.
        // mainWindow.webContents.openDevTools();
    
        // Emitted when the window is closed.
        verWin.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        verWin = null;
        });
    }

    ipc.on("ver", ()=> {
        createWindowVer();
    });

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

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
    autoUpdater.checkForUpdates();
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
//         return;
//     })
// })