// import akarata from "akarata";
// import Fuse from "fuse.js";
import { create, insert, search } from "@nearform/lyra";
import { formatCapital } from "../utils";
import baku from "./baku.json";
import kamus from "./kamus.json";
import { WordCorrection } from "./types";

const db = create({
  schema: {
    w: "string",
  },
});

// const entriesFuse = kamus.map((item) => ({ text: item }));

kamus.forEach((item) => {
  insert(db, {
    w: item,
  });
});

interface WordCache {
  [key: string]: WordCorrection;
}

let resultCache: WordCache = {};

const isNumber = (n: any) => {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
};

// const fuse: any = new Fuse(entriesFuse, {
//   keys: ["text"],
//   //@ts-ignore
//   id: "text",
//   shouldSort: true,
//   threshold: 0.2,
//   location: 0,
//   distance: 100,
//   minMatchCharLength: 3,
// });

//@ts-ignore
export const checkWord = (currentText, id, setCorrections) => {
  let result: any = [];
  const checkText = currentText.toLowerCase();
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
  } else if (kamus.includes(checkText)) {
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
      // const results = fuse.search(checkText);

      const searchResult = search(db, {
        term: checkText,
        tolerance: 3,
        properties: "*",
      });
      if (searchResult.hits.length) {
        resultCache[checkText] = {
          id: 0,
          found: true,
          old: currentText,
          new: formatCapital(currentText, searchResult.hits[0].w),
        };
        if (checkText !== "") {
          result = [
            {
              old: currentText,
              id,
              new: formatCapital(currentText, searchResult.hits[0].w),
            },
          ];
          setCorrections((c: any) => [...c, ...result]);
        }
      } else {
        resultCache[checkText] = {
          id: 0,
          notFound: true,
          old: currentText,
          new: currentText,
        };
        if (checkText !== "") {
          result = [
            {
              old: currentText,
              id,
              new: currentText,
              notFound: true,
            },
          ];
          setCorrections((c: any) => [...c, ...result]);
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
