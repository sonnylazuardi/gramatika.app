import React from "react";
import { WordCorrection } from "./data/types";

interface Props {
  id: number;
  text?: string | null;
  ignored?: boolean;
  error?: boolean;
  active?: boolean;
  corrections: WordCorrection[];
  setCorrections: React.Dispatch<React.SetStateAction<WordCorrection[]>>;
}

const WordChecker = ({
  text = null,
  setCorrections,
  id,
  ignored,
  error,
  active,
  corrections,
}: Props) => {
  const handleCheck = () => {
    const currentIndex = corrections.findIndex((v) => v.id === id);
    let result = [...corrections];
    if (currentIndex > 0) {
      const removed = result.splice(currentIndex, 1)[0];
      result.unshift(removed);
    }
    setCorrections(result);
  };
  return (
    <span
      style={{ pointerEvents: 'auto' }}
      className={active ? "active" : error && !ignored ? "error" : ""}
      onClick={() => handleCheck()}
      onMouseDown={() => handleCheck()}
      onTouchStart={() => handleCheck()}
    >
      {text}
    </span>
  );
};

export default WordChecker;
