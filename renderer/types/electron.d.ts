export {};

declare global {
  interface Window {
    electronAPI: {
      loadData: () => Promise<any>;
      saveData: (payload: any) => Promise<any>;
    };
  }
}
