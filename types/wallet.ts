export type FlexibleProvider = {
  request: (...args: any[]) => Promise<any>
  [key: string]: any
}
