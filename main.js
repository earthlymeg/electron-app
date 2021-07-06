const {
    app,
    BrowserWindow,
    ipcMain,
    Menu
  } = require("electron");
require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
});
const url = require('url');
const path = require('path');


let mainWindow;
let addWindow;

//Listen for app to be ready

app.on('ready', function () {
    //create new window

    //TODO: change current process to use a preloader instead of making node integration true
        //the current state is a security vulnerability
    mainWindow = new BrowserWindow(
        {
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
              },
        }
    );
    

    //load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true

    }))
    mainWindow.on('closed', function () {
      app.quit();
    })



    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
})



//handle create add winow

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add To-Do List Item',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
          },
    });
   
    
    //load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true

    }))

    addWindow.on('close', function(){
        addWindow = null;
    })

}

// Catch item:add
ipcMain.on('item:add', function(e, item){
  mainWindow.webContents.send('item:add', item);
  addWindow.close();
})

//create menu template
const mainMenuTemplate = [
    
    {
        label: "File",
        submenu: [
            {
                label: 'Add Item',
                click() {
                    createAddWindow();
                },
            },
            {
                label: 'Clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');

                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },

];
// add dev tools item if in development

if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
      label: 'Developer Tools 🛠',
      submenu: [
          {
              label: 'Toggle DevTools',
              accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
              click(item, focusedWindow){
                  focusedWindow.toggleDevTools();
              }
          },
          {
              role: 'reload'
          }
      ]

  })    
}