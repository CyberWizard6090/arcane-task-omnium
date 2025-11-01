import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { promises as fs } from 'fs';

const isDev = process.env.NODE_ENV !== 'production';

function getDataPath() {
  return path.join(app.getPath('userData'), 'kanban-data.json');
}

async function loadData() {
  try {
    const file = await fs.readFile(getDataPath(), 'utf-8');
    return JSON.parse(file);
  } catch (e) {
    return null;
  }
}
async function saveData(data: any) {
  await fs.writeFile(getDataPath(), JSON.stringify(data, null, 2), 'utf-8');
}

let win: BrowserWindow | null = null;

async function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    transparent: true,
    frame: false, // можно убрать, если нужна стандартная рамка
    resizable: true,
    // alwaysOnTop: false, // опционально
    backgroundColor: '#00000000', // полностью прозрачный фон
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const port = process.env.VITE_DEV_SERVER_PORT || 5173;

  if (isDev) {
    await win.loadURL(`http://localhost:${port}`);
    // win.webContents.openDevTools();
  } else {
    await win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

ipcMain.handle('load-data', async () => {
  const data = await loadData();
  return data;
});

ipcMain.handle('save-data', async (_e, payload) => {
  await saveData(payload);
  return { ok: true };
});

ipcMain.on('minimize-window', () => {
  if (win) win.minimize();
});

ipcMain.on('maximize-window', () => {
  if (!win) return;
  if (win.isMaximized()) win.unmaximize();
  else win.maximize();
});

ipcMain.on('close-window', () => {
  if (win) win.close();
});

ipcMain.on('window-close', () => {
  if (win) win.close();
});

ipcMain.on('resize-window', (_e, { width, height }) => {
  if (!win) return;
  const minWidth = 300;
  const minHeight = 200;
  win.setSize(Math.max(minWidth, Math.floor(width)), Math.max(minHeight, Math.floor(height)));
});

ipcMain.handle('get-window-size', () => {
  if (!win) return { width: 1200, height: 800 };
  const [width, height] = win.getSize();
  return { width, height };
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
