import Quill from "quill";
import "quill/dist/quill.bubble.css";
import { useEffect, useRef, useState } from "react";
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
  const quillRef = useRef<Quill>();
  const containerRef = useRef<HTMLDivElement>(null);

  const [numChars, setNumChars] = useState(0);

  function handleEditorChange() {
    if (!quillRef.current || !props.onChange) return;
    const length = quillRef.current.getLength();
    setNumChars(length - 1); //quill content min length is 1
    props.onChange(
      //quill clean state has residual `\n`
      length <= 1 ? "" : JSON.stringify(quillRef.current.getContents())
    );
  }

  useEffect(() => {
    if (quillRef.current) return;
    quillRef.current = new Quill(containerRef.current as Element, {
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
      quillRef.current.setContents(JSON.parse(props.content));
    } catch (err) {
      //previous rich text format based on draft-js will throw parse error
      //in this case just set it to blank
      quillRef.current.setContents(quillRef.current.getContents());
    }

    if (!props.readOnly) {
      /** even if quill is empty, it's string value for form purposes is not.
      after mounting, set form value to "", so that form state with initially empty quill value
      will be blocked by validation on re-submit
      */
      if (quillRef.current.getLength() <= 1) {
        props.onChange("");
      }

      quillRef.current.on("editor-change", handleEditorChange);
    }

    return () => {
      if (!props.readOnly) {
        quillRef.current?.off("editor-change", handleEditorChange);
      }
    };
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
