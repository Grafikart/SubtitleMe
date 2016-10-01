const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    frame: false,
    transparent: true
  })

  // and load the index.html of the app.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`file://${__dirname}/index.dev.html`)
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`)
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('close', function (){
  mainWindow.close()
})

ipc.on('minimize', function (){
  mainWindow.minimize()
})

let maximized = false // mainWindow.isMaximized() doesn't work :(
ipc.on('maximize', function (){
  if (maximized) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
  maximized = !maximized
})
