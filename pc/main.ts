import { app, BrowserWindow, screen, Tray } from 'electron';
import * as path from 'path';
import * as url from 'url';

let window: BrowserWindow = null;
let tray: Tray = null;

const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const size = screen.getPrimaryDisplay().workAreaSize;

  window = new BrowserWindow({
	width: 450,
	maxWidth: 450,
	minWidth: 450,
	height: 650,
	minHeight: 650,
	x: size.width - 450,
	y: size.height - 650,

	icon: "dist/assets/icons/favicon.ico",

    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,
      enableRemoteModule : true
    },
  });

  if (serve) {

    //window.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    window.loadURL('http://localhost:4200');

  } else {
    window.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  window.on('closed', () => {
    window = null;
  });

  return window;
}

function createTray(): Tray {

	tray = new Tray("dist/assets/icons/favicon.ico");

	return tray;
}

try {
  app.on('ready', () => {
	  createWindow();
	  createTray();
  });
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (window === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
}
