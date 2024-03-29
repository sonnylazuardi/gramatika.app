import React from "react";
import {
  isSafari,
  isMobileSafari,
  isSamsungBrowser,
  isAndroid,
} from "react-device-detect";

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
};

export const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const formatText = (text: string) => {
  return text.replace(/[\w\-']*/gi, (m) => `¦${m}`).split(/¦/g);
};

export const startsWithCapital = (word: string) => {
  return /[A-Z]/.test(word.charAt(0));
};

export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const formatCapital = (old: string, word: string) => {
  if (startsWithCapital(old)) {
    return capitalizeFirstLetter(word);
  }
  return word;
};
