import { unpack } from "helpers";
import Quill from "quill";
import { useCallback, useState } from "react";
import { toDelta } from "./helpers";
import type { Props } from "./types";

export default function RichText({ classes, ...props }: Props) {
  const style = unpack(classes);
  const [numChars, setNumChars] = useState(props.content.length ?? 0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: called only on page load
  const containerRef = useCallback((container: HTMLDivElement | null) => {
    if (!container) return;

    const quill = new Quill(container, {
      placeholder: props.placeHolder,
      readOnly: props.readOnly,
      theme: "snow",
      formats: ["bold", "italic", "indent", "list"],
      modules: {
        toolbar: [
          ["bold", "italic"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
    });

    quill.setContents(toDelta(props.content));

    if (props.readOnly) return;

    quill.on("editor-change", function handleChange() {
      //quill content min length is 1
      const numChars = quill.getLength() - 1;
      setNumChars(numChars);

      props.onChange({
        //quill clean state has residual `\n`
        value: numChars <= 0 ? "" : JSON.stringify(quill.getContents()),
        length: numChars,
      });
    });
  }, []);

  return (
    <div className={style.container}>
      <div
        aria-invalid={!!props.error}
        aria-disabled={props.disabled}
        className={`relative has-[:focus-within]:ring-2 ring-blue-d1 ring-offset-1 ${style.field} ${props.readOnly ? "toolbar-hidden" : ""}`}
      >
        <div
          style={{ fontFamily: "inherit", fontSize: "inherit" }}
          className="w-full h-full text-base"
          ref={containerRef}
        />
        {!props.readOnly && (
          <span
            className={`absolute top-4 right-4 text-xs uppercase ${
              style.counter ?? ""
            }`}
          >
            chars : {numChars}
            {props.charLimit && ` /${props.charLimit}`}
          </span>
        )}
      </div>
      <p className={`empty:hidden text-red-d1 text-xs mt-1 ${style.error}`}>
        {props.error}
      </p>
    </div>
  );
}
