import { useState } from "react"
import { tryToCatch } from "../../utils/tryToCatch";
import { getItem } from "./session-storage.service";

interface SessionStorageProps<T> {
  key: string;
  defaultValue: T;
}
export const useSessionStorage = <T>({ key, defaultValue }: SessionStorageProps<T>) => {
  const [storedValue, setStoredValue] = useState<T>(() => getItem({ key, defaultValue }));

  const setSessionValue = (value: T) => {
    if (window === undefined) return defaultValue

    const valueString = JSON.stringify(value);
    setStoredValue(value);
    tryToCatch(() => window.sessionStorage.setItem(key, valueString));
  };
  const clear = () => {
    if (window === undefined) return
    window.sessionStorage.clear();
  }

  return [storedValue, setSessionValue, clear] as const
}