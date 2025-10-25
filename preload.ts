import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  loadData: () => ipcRenderer.invoke('load-data'),
  saveData: (payload: any) => ipcRenderer.invoke('save-data', payload),
});

declare global {
  interface Window {
    electronAPI: {
      loadData: () => Promise<any>;
      saveData: (payload: any) => Promise<any>;
    };
  }
}
