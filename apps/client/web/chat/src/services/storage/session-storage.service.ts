import { tryToCatchSync } from "../../utils/tryToCatch"


interface GetItemProps {
  key: string
  defaultValue: any
}
export const getItem = <T>({ key, defaultValue }: GetItemProps) => {
  if (window === undefined) return defaultValue

  const [error, item] = tryToCatchSync<string>(() => window.sessionStorage.getItem(key))
  if (error || !item) return defaultValue

  const [errorItem, itemParsed] = tryToCatchSync<T>(JSON.parse, item)
  if (errorItem || !itemParsed) return defaultValue

  return itemParsed
}

export default {
  getItem
}