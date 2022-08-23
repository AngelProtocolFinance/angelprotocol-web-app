import Quill from "quill";
import "quill/dist/quill.bubble.css";
import { useCallback, useState } from "react";
import "./richtext.css";

type ReadOnly = {
  readOnly: true;
  onChange?(...event: any[]): never;
  placeHolder?: never;
};

type Editable = {
  readOnly?: never;
  onChange(...event: any[]): void;
  placeHolder: string;
};

type Props = (ReadOnly | Editable) & {
  content: string;
  classes?: { container?: string };
};

export default function RichText(props: Props) {
  const [numChars, setNumChars] = useState(0);

  const containerRef = useCallback((container: HTMLDivElement | null) => {
    if (!container) return;

    const quill = new Quill(container, {
      placeholder: props.placeHolder,
      readOnly: props.readOnly,
      theme: "bubble",
      formats: ["bold", "italic", "indent", "list"],
      modules: {
        toolbar: [
          ["bold", "italic"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
    });

    try {
      quill.setContents(JSON.parse(props.content));
    } catch (err) {
      //previous rich text format based on draft-js will throw parse error
      //in this case just set it to blank
      quill.setContents(quill.getContents());
    }

    if (!props.readOnly) {
      /** even if quill is empty, it's string value for form purposes is not.
      after mounting, set form value to "", so that form state with initially empty quill value
      will be blocked by validation on re-submit
      */
      if (quill.getLength() <= 1) {
        props.onChange("");
      }

      quill.on("editor-change", function handleChange() {
        if (!props.onChange) return;
        const length = quill.getLength();
        setNumChars(length - 1); //quill content min length is 1
        props.onChange(
          //quill clean state has residual `\n`
          length <= 1 ? "" : JSON.stringify(quill.getContents())
        );
      });
      /**NOTE: `const quill` will be garbage collected when RichText unmounts,
       * no need to add quill.off cleanup
       */
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className={`relative ${props.classes?.container || ""}`}>
      <div
        style={{ fontFamily: "inherit", fontSize: "inherit" }}
        className="w-full h-full bg-transparent text-base"
        ref={containerRef}
      />
      {!props.readOnly && (
        <span className="absolute bottom-1 right-1 text-xs text-angel-grey uppercase font-mono">
          chars:{numChars}
        </span>
      )}
    </div>
  );
}
