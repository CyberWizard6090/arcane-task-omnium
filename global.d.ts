export {};

declare global {
  interface GlobalThis {
    electronAPI: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      resizeWindow: (size: { width: number; height: number }) => void;
      loadData: () => Promise<any>;
      saveData: (payload: any) => Promise<any>;
      getWindowSize: () => Promise<{ width: number; height: number }>;
    };
  }
}
