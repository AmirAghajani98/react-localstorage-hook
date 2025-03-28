import { useState } from "react";
export function useLocalStorageWithExpiry(key, initialValue, expiryInMinutes) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      const parsed = JSON.parse(item);
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
  const setValue = (value) => {
    try {
      const expiry = expiryInMinutes
        ? Date.now() + expiryInMinutes * 60 * 1000
        : undefined;
      const item = { value, expiry };
      window.localStorage.setItem(key, JSON.stringify(item));
      setStoredValue(value);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };
  return [storedValue, setValue];
}
