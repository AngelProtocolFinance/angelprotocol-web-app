import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useState } from "react";
import { Props } from "./types";
import "./richtext.css";

export default function RichText(props: Props) {
  const [numChars, setNumChars] = useState(0);

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

    try {
      quill.setContents(JSON.parse(props.content.value));
    } catch (err) {
      //previous rich text format based on draft-js will throw parse error
      //in this case just set it to blank
      quill.setContents(quill.getContents());
    } finally {
      // set initial number of chars
      setNumChars(quill.getLength() - 1);
    }

    if (!props.readOnly) {
      /** even if quill is empty, it's string value for form purposes is not.
      after mounting, set form value to "", so that form state with initially empty quill value
      will be blocked by validation on re-submit
      */
      if (quill.getLength() <= 1) {
        props.onChange({ value: "", length: 0 });
      }

      quill.on("editor-change", function handleChange() {
        //quill content min length is 1
        const numChars = quill.getLength() - 1;
        setNumChars(numChars);

        if (props.charLimit && numChars > props.charLimit) {
          return props.onError(`character limit reached`);
        }

        props.onChange({
          //quill clean state has residual `\n`
          value: numChars <= 0 ? "" : JSON.stringify(quill.getContents()),
          length: numChars,
        });
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div
      aria-invalid={props.invalid}
      aria-disabled={props.disabled}
      className={`relative ${props.classes?.container || ""} ${
        props.readOnly ? "toolbar-hidden" : ""
      }`}
    >
      <div
        style={{ fontFamily: "inherit", fontSize: "inherit" }}
        className="w-full h-full text-base"
        ref={containerRef}
      />
      {!props.readOnly && (
        <span
          className={`absolute top-4 right-4 text-xs uppercase ${
            props.classes?.charCounter ?? ""
          }`}
        >
          chars : {numChars}
          {props.charLimit && ` /${props.charLimit}`}
        </span>
      )}
    </div>
  );
}
