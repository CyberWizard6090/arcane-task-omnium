import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { app, BrowserWindow, ipcMain } from 'electron';

const isDev = process.env.NODE_ENV !== 'production';

const BASE_DIR = dirname(fileURLToPath(import.meta.url));

const getDataPath = () => path.join(app.getPath('userData'), 'kanban-data.json');

const loadData = async () => {
  try {
    const file = await fs.readFile(getDataPath(), 'utf-8');
    return JSON.parse(file);
  } catch {
    return null;
  }
};

const saveData = async (data: any) => {
  await fs.writeFile(getDataPath(), JSON.stringify(data, null, 2), 'utf-8');
};

let win: BrowserWindow | null = null;
const preloadPath = path.join(BASE_DIR, '../dist/preload.js');
const createWindow = async () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    transparent: true,
    frame: false,
    resizable: true,
    backgroundColor: '#00000000',
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const port = process.env.VITE_DEV_SERVER_PORT || 5173;

  if (isDev) {
    await win.loadURL(`http://localhost:${port}`);
    win.webContents.openDevTools();
  } else {
    await win.loadFile(path.join(BASE_DIR, '../dist/index.html'));
  }
};

app
  .whenReady()
  .then(createWindow)
  .catch((err) => {
    console.error('Ошибка при создании окна:', err);
    app.quit();
  });

ipcMain.handle('load-data', async () => await loadData());

ipcMain.handle('save-data', async (_e, payload) => {
  await saveData(payload);
  return { ok: true };
});

ipcMain.on('minimize-window', () => win?.minimize());

ipcMain.on('maximize-window', () => {
  if (!win) return;
  win.isMaximized() ? win.unmaximize() : win.maximize();
});

ipcMain.on('close-window', () => win?.close());

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
