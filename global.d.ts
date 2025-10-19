
export {}

declare global {
  interface GlobalThis {
    api: {
      send: (channel: string, data: any) => void
    }
  }
}
