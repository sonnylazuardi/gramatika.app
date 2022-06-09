import React from "react";
import CheckIcon from "./icons/check";
import TrashIcon from "./icons/trash";
import Loader from "./Loader";

interface Props {
  oldTitle?: string | null;
  newTitle?: string | null;
  onConfirm: any;
  onSkip: any;
  kbbiMode: boolean;
}

const CardKateglo = ({
  oldTitle = null,
  newTitle = null,
  onConfirm,
  onSkip,
  kbbiMode,
}: Props) => {
  const [description, setDescription] = React.useState("");
  React.useEffect(() => {
    setDescription("");
    if (newTitle) {
      fetch(`https://kateglo.com/api.php?format=json&phrase=${newTitle}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.kateglo && data.kateglo.definition) {
            if (data.kateglo.definition.length) {
              setDescription(
                `${data.kateglo.definition
                  .map((v: any, i: any) => `<b>${i + 1}.</b> ${v.def_text}`)
                  .join(", ")}`
              );
            }
          }
        })
        .catch((e) => {
          fetch(`https://katla.vercel.app/api/define/${newTitle}`)
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                setDescription(
                  `${data.map((v: any, i: any) => `<b>${i + 1}.</b> ${v}`).join(", ")}`
                );
              }
            })
            .catch((e) => {
              setDescription(" ");
            });
        });
    }
  }, [newTitle]);
  return (
    <div
      className="card text-left shadow-2xl w-full overflow-hidden relative"
      style={{ height: 182, width: "100%" }}
    >
      <div className="card-body p-4">
        {kbbiMode ? (
          <h2 className="card-title space-x-1 w-full">
            {description === " " ? (
              `${newTitle} tidak dikenali`
            ) : (
              <a
                className="link"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://kbbi.kemdikbud.go.id/entri/${newTitle}`}
              >
                {newTitle}
              </a>
            )}
          </h2>
        ) : (
          <h2 className="card-title space-x-1 w-full">
            <span className="line-through">{oldTitle}</span>
            <span>→</span>
            <a
              className="link"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://kbbi.kemdikbud.go.id/entri/${newTitle}`}
            >
              {newTitle}
            </a>
          </h2>
        )}

        <div className="w-full mb-10 overflow-y-auto" style={{ height: 74 }}>
          {description !== "" ? (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            <Loader />
          )}
        </div>
        {!kbbiMode ? (
          <div className="justify-start card-actions absolute bottom-0 left-0 right-0 px-4 py-2">
            <button
              className="btn btn-sm btn-primary btn-accent"
              onClick={onConfirm}
            >
              <CheckIcon />
              Terapkan
            </button>
            <button
              className="btn btn-sm btn-outline btn-accent"
              onClick={onSkip}
            >
              <TrashIcon />
              Lewati
            </button>
          </div>
        ) : null}
        {kbbiMode ? (
          <div className="justify-start card-actions absolute bottom-0 left-0 right-0 px-4 py-2">
            <button
              className="btn btn-sm btn-primary btn-accent"
              onClick={onConfirm}
            >
              <CheckIcon />
              Lanjut
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CardKateglo;
