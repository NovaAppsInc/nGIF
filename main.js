// Modules to control application life and create native browser window
require('update-electron-app')();
const { create } = require('domain');
const { app, BrowserWindow, autoUpdater ,globalShortcut, ipcMain, Menu, nativeTheme } = require('electron');
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
        thickFrame: true,
        backgroundColor: '#222222',
        webPreferences: {
            nodeIntegration: true,
            devTools: true,
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

    function createWindowVer() {
        verWin = new BrowserWindow({
            width: 400,
            height: 300,
            minWidth: 400,
            minHeight: 300,
            darkTheme: true,
            backgroundColor: '#222222',
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                devTools: true,
                preload: path.join(__dirname, 'preload.js'),
            },
            scrollBounce: true,
            icon: "./icon.ico"
        });

        var menu = Menu.buildFromTemplate([
            {
                label: 'Quit',
                click() {
                    verWin.close();
                }
            }
        ]);

        Menu.setApplicationMenu(menu); 

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

    function createGallery() {
    // Create the browser window.
        galleryWin = new BrowserWindow({
            width: 855,
            height: 655,
            minWidth: 855,
            minHeight: 655,
            frame: true,
            darkTheme: true,
            thickFrame: true,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                devTools: true,
                preload: path.join(__dirname, 'preload.js'),
            },
            scrollBounce: true,
            icon: "./icon.ico"
        });

        var menu = Menu.buildFromTemplate([
            {
                label: 'Quit',
                role: 'close',
                role: 'quit'
            }
        ]);

        Menu.setApplicationMenu(menu); 

        galleryWin.loadFile('gallery.html');

        // Open the DevTools.
        galleryWin.webContents.openDevTools();
    
        // Emitted when the window is closed.
        galleryWin.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        galleryWin = null;
        });
    }

    ipc.on("gall", () => {
        createGallery();
    });

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
    // Menu.setApplicationMenu(null)
    autoUpdater.checkForUpdates();
    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
        const dialogOpts = {
          type: 'info',
          buttons: ['Restart', 'Later'],
          title: 'nGIFUpdate',
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
    });
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