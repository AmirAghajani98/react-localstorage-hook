import { useState } from "react";

interface LocalStorageWithExpiry<T> {
  value: T;
  expiry?: number;
}

export function useLocalStorageWithExpiry<T>(
  key: string,
  initialValue: T,
  expiryInMinutes?: number
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      const parsed: LocalStorageWithExpiry<T> = JSON.parse(item);
      if (parsed.expiry && Date.now() > parsed.expiry) {
        window.localStorage.removeItem(key);
        return initialValue;
      }
      return parsed.value;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const expiry = expiryInMinutes
        ? Date.now() + expiryInMinutes * 60 * 1000
        : undefined;
      const item: LocalStorageWithExpiry<T> = { value, expiry };
      window.localStorage.setItem(key, JSON.stringify(item));
      setStoredValue(value);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  return [storedValue, setValue];
}
