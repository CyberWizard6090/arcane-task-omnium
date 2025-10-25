export {};

declare global {
  interface GlobalThis {
    api: {
      send: (channel: string, data: any) => void;
    };
  }
}
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
