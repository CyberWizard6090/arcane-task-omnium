import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('minimize-window'),
  maximize: () => ipcRenderer.send('maximize-window'),
  close: () => ipcRenderer.send('close-window'),
  resizeWindow: (size: { width: number; height: number }) =>
    ipcRenderer.send('resize-window', size),
  getWindowSize: () => ipcRenderer.invoke('get-window-size'),
  loadData: () => ipcRenderer.invoke('load-data'),
  saveData: (payload: any) => ipcRenderer.invoke('save-data', payload),
});
