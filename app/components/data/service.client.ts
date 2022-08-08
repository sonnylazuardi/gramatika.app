import { formatCapital } from "../utils";
import baku from "./baku.json";
import { WordCorrection } from "./types";

const Typo = require("typo-js");
const dictionary = new Typo("id_ID", false, false, { dictionaryPath: "dic" });

interface WordCache {
  [key: string]: WordCorrection;
}

let resultCache: WordCache = {};
let correctCache: any = {};

const isNumber = (n: any) => {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
};

//@ts-ignore
export const checkWord = (currentText, id, setCorrections) => {
  let result: any = [];
  const checkText = currentText;
  if ((baku as any)[checkText]) {
    result = [
      {
        id,
        old: currentText,
        new: formatCapital(currentText, (baku as any)[checkText]),
      },
    ];
    setCorrections((c: any) => [...c, ...result]);
  } else if (/^(dst|dll|hlm|dsb|yth|sda|ybs|ttd|dkk)/.test(checkText)) {
    // do nothing
    // } else if (kamus.includes(checkText)) {
    // console.log(`${currentText} ==> NO CHANGE`);
    // } else if (kamus.includes(akarata.stem(checkText))) {
    // console.log(`${currentText} ==> ${akarata.stem(currentText)}`);
  } else if (isNumber(checkText)) {
    // do nothing
  } else if (checkText.length <= 2) {
    // do nothing
    // }
  } else {
    if (resultCache[checkText]) {
      if (resultCache[checkText].found || resultCache[checkText].notFound) {
        result = [
          {
            ...resultCache[checkText],
            old: currentText,
            id,
          },
        ];
        setCorrections((c: any) => [...c, ...result]);
      }
    } else {
      if (correctCache[checkText]) {
        // skip
      } else {
        const isCorrect = dictionary.check(checkText);
        if (!isCorrect) {
          const correction = dictionary.suggest(checkText);
          const newText = correction.length
            ? formatCapital(currentText, correction[0])
            : currentText;
          const notFound = !correction.length
            ? { notFound: true }
            : { found: true };
          resultCache[checkText] = {
            id: 0,
            ...notFound,
            old: currentText,
            new: newText,
          };
          if (checkText !== "") {
            result = [
              {
                old: currentText,
                id,
                new: newText,
                ...notFound,
              },
            ];
            setCorrections((c: any) => [...c, ...result]);
          }
        } else {
          correctCache[checkText] = true;
        }
      }
    }
  }
  return result;
};

//@ts-ignore
export const setKbbiWord = (currentText, id, setCorrections) => {
  let result: any = [];
  if (currentText.trim() !== "" && /\w/.test(currentText)) {
    result = [
      {
        id,
        old: currentText,
        new: currentText,
      },
    ];
    setCorrections((c: any) => [...c, ...result]);
  }
  return result;
};
