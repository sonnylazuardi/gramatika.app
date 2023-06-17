import React from "react";
import Loader from "./Loader";
import { formatText, useDebounce, usePrevious } from "./utils";
import { useEditable } from "use-editable";
import Card from "./Card";
import CardKateglo from "./CardKateglo";
import WordChecker from "./WordChecker";
import SearchIcon from "./icons/search";
import CheckIcon from "./icons/check";
import TrashIcon from "./icons/trash";
import SettingsIcon from "./icons/settings";
import BookIcon from "./icons/book";
import EditIcon from "./icons/edit";
import { PopupState, WordCorrection } from "./data/types";
import { checkWord, setKbbiWord } from "./data/service";

const Popup = () => {
  const [text, setText] = React.useState(" ");
  const debouncedSearchText = useDebounce(text, 1000);
  const [kbbiMode, setKbbiMode] = React.useState(false);
  const [popupState, setPopupState] = React.useState<PopupState>(
    PopupState.idle
  );
  const [corrections, setCorrections] = React.useState<WordCorrection[]>([]);

  const [ignoredIds, setIgnoredIds] = React.useState<number[]>([]);
  const editorRef = React.useRef(null);
  const editorRefShadow = React.useRef(null);

  useEditable(
    editorRef,
    React.useCallback(
      (value) => {
        setPopupState(PopupState.loading);
        setText(value);
      },
      [setText]
    )
  );

  useEditable(
    editorRefShadow,
    (value) => {
      console.log(value);
    },
    { disabled: true }
  );

  React.useEffect(() => {
    if (editorRef.current) {
      (editorRef.current as any).focus();
    }

    // document.addEventListener('focusout', function (e) { window.scrollTo(0, 0) });
  }, []);

  const prevSearch = usePrevious(debouncedSearchText);

  //@ts-ignore
  const handleCheck = async (debouncedSearchText, setCorrections, kbbiMode) => {
    setCorrections([]);
    if (!kbbiMode) {
      console.time("test");
      return Promise.all(
        formatText(debouncedSearchText).map((content, i) => {
          return checkWord(content, i, setCorrections);
        })
      ).then((data) => {
        const corrections = data.reduce((arr, row) => {
          return arr.concat(row);
        }, []);

        console.timeEnd("test");

        if (corrections.length === 0 && debouncedSearchText.trim() !== "") {
          setPopupState(PopupState.finished);
        } else if (corrections.length > 0) {
          setPopupState(PopupState.fixing);
        } else {
          setPopupState(PopupState.idle);
        }
      });
    } else {
      return Promise.all(
        formatText(debouncedSearchText).map((content, i) => {
          return setKbbiWord(content, i, setCorrections);
        })
      ).then((data) => {
        const corrections = data.reduce((arr, row) => {
          return arr.concat(row);
        }, []);

        if (corrections.length === 0 && debouncedSearchText.trim() !== "") {
          setPopupState(PopupState.finished);
        } else if (corrections.length > 0) {
          setPopupState(PopupState.fixing);
        } else {
          setPopupState(PopupState.idle);
        }
      });
    }
  };

  React.useEffect(() => {
    const searchChanged = prevSearch !== debouncedSearchText;
    if (searchChanged) {
      handleCheck(debouncedSearchText, setCorrections, kbbiMode);
    }
  }, [debouncedSearchText, corrections, setCorrections, kbbiMode]);

  React.useEffect(() => {
    if (window.localStorage.getItem("showDictionary") === "1") {
      setKbbiMode(true);
    }
  }, [setKbbiMode]);

  const currentCorrection: WordCorrection | null = corrections[0];
  const editorClass =
    "editor w-full textarea bg-base-200 rounded-md text-base " +
    (text.trim() === "" && "empty");
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col justify-start items-start p-4 max-w-lg mx-auto">
        <div
          style={{ height: 400 }}
          className={`bg-base-200 relative overflow-y-auto overflow-x-hidden scrollbar-hide w-full rounded-md ${
            kbbiMode ? "kbbi" : ""
          }`}
        >
          <div
            ref={editorRef}
            tabIndex={0}
            placeholder="Tulis sesuatu di sini..."
            style={{ minHeight: 400, whiteSpace: "pre-wrap" }}
            className={editorClass}
          >
            {text}
          </div>
          <div
            style={{
              minHeight: 400,
              whiteSpace: "pre-wrap",
              opacity: popupState === PopupState.loading ? 0 : 0.6,
              position: "absolute",
              top: 0,
              pointerEvents: "none",
            }}
            className={editorClass}
            placeholder="Tulis sesuatu di sini..."
            ref={editorRefShadow}
          >
            {formatText(debouncedSearchText).map((content, i) => {
              const error = corrections.some((v) => v.id === i);
              const active = currentCorrection && currentCorrection.id === i;
              return (
                <React.Fragment key={i}>
                  <WordChecker
                    id={i}
                    setCorrections={setCorrections}
                    ignored={ignoredIds.includes(i)}
                    error={error}
                    active={active}
                    corrections={corrections}
                    text={content + ""}
                  ></WordChecker>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        {popupState === PopupState.idle ? (
          <Card
            title={
              <h2 className="card-title space-x-1">
                <SearchIcon />
                Gramatika
              </h2>
            }
          >
            <p>
              Setiap kata yang ditulis akan dicek dan diberikan masukan jika
              mengandung kesalahan ejaan baku Bahasa Indonesia.
            </p>
          </Card>
        ) : null}
        {popupState === PopupState.loading ? (
          <Card>
            <Loader />
          </Card>
        ) : null}

        {popupState === PopupState.fixing &&
        currentCorrection &&
        !currentCorrection.notFound ? (
          <CardKateglo
            kbbiMode={kbbiMode}
            oldTitle={currentCorrection.old}
            newTitle={currentCorrection.new}
            onConfirm={() => {
              if (!kbbiMode) {
                const id = currentCorrection.id;
                setPopupState(PopupState.loading);

                setText(
                  formatText(text)
                    .map((v, i) => {
                      if (i === id) {
                        return currentCorrection.new;
                      }
                      return v;
                    })
                    .join("")
                );

                // setTimeout(() => {
                //   setPopupState(PopupState.fixing)
                // })
                setCorrections((c) => {
                  const val = c.filter((v) => v.id !== id);
                  if (!val.length) {
                    setTimeout(() => setPopupState(PopupState.finished), 1000);
                  }
                  return val;
                });
              } else {
                let currentIndex =
                  corrections.findIndex((v) => v.id === corrections[0].id) + 1;
                if (currentIndex > corrections.length) currentIndex = 0;
                let result = [...corrections];
                if (currentIndex > 0) {
                  const removed = result.splice(
                    currentIndex,
                    corrections.length - currentIndex
                  );
                  result = [...removed, ...result];
                }
                setCorrections(result);
              }
            }}
            onSkip={() => {
              const id = currentCorrection.id;
              setIgnoredIds((c) => [...c, id]);
              setCorrections((c) => {
                const val = c.filter((v) => v.id !== id);
                if (!val.length) setPopupState(PopupState.finished);
                return val;
              });
            }}
          ></CardKateglo>
        ) : null}

        {popupState === PopupState.fixing &&
        currentCorrection &&
        currentCorrection.notFound ? (
          <Card
            title={
              <h2 className="card-title space-x-1">
                <span>{currentCorrection.old}</span> tidak dikenali
              </h2>
            }
          >
            <p style={{ height: 50 }}></p>
            <div className="justify-start card-actions absolute bottom-0 left-0 right-0 px-4 py-2">
              <button
                disabled
                className="btn btn-sm btn-primary btn-accent opacity-60"
              >
                <CheckIcon />
                Terapkan
              </button>
              <button
                className="btn btn-sm btn-outline btn-accent"
                onClick={() => {
                  const id = currentCorrection.id;
                  setIgnoredIds((c) => [...c, id]);
                  setCorrections((c) => {
                    const val = c.filter((v) => v.id !== id);
                    if (!val.length) setPopupState(PopupState.finished);
                    return val;
                  });
                }}
              >
                <TrashIcon />
                Lewati
              </button>
            </div>
          </Card>
        ) : null}

        {popupState === PopupState.finished ? (
          <div
            className="card text-left shadow-2xl w-full"
            style={{ height: 182 }}
          >
            <div className="card-body p-4">
              <h2 className="card-title">
                <CheckIcon />
                Selesai
              </h2>
              <p style={{ height: 50 }}>Pengecekan teks selesai</p>
              <div className="justify-start card-actions absolute bottom-0 left-0 right-0 px-4 py-2">
                <button
                  className="btn btn-sm btn-primary btn-accent"
                  onClick={async () => {
                    if (!navigator.clipboard) return;
                    try {
                      await navigator.clipboard.writeText(text);
                    } catch (err) {
                      console.log("Failed to copy!", err);
                    }
                  }}
                >
                  Salin Teks
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex flex-row w-full pt-2 justify-between items-center">
          <div className="flex flex-row opacity-40">
            Dibangun oleh{" "}
            <a
              className="link ml-1"
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/sonnylazuardi"
            >
              Sonny
            </a>
          </div>
          <div className="flex flex-row space-x-2">
            <div
              className="tooltip"
              data-tip={kbbiMode ? "Mode Menyunting" : "Mode KBBI"}
            >
              <button
                className="btn btn-circle btn-sm opacity-50"
                onClick={() => {
                  setKbbiMode((kbbiMode: any) => {
                    const newVal = !kbbiMode;
                    window.localStorage.setItem(
                      "showDictionary",
                      newVal ? "1" : "0"
                    );
                    setIgnoredIds([]);
                    handleCheck(text, setCorrections, newVal);
                    return newVal;
                  });
                }}
              >
                {kbbiMode ? <EditIcon /> : <BookIcon />}
              </button>
            </div>
            <div className="tooltip" data-tip="Pengaturan">
              <a href={""} className="btn btn-circle btn-sm opacity-50">
                <SettingsIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
