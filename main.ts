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
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    await win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
