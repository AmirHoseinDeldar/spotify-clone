import { useState, useEffect } from "react";

export default function useDebounce<T>(value: T, delay?: number): T {
  const [DebounceValue, setDebounceValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return DebounceValue;
}
