import type TQuill from "quill";
const Quill =
  typeof window !== "object"
    ? null
    : await import("quill").then((x) => x.default);

import { forwardRef, useImperativeHandle, useRef } from "react";
import { to_delta } from "./helpers";
import type { Props } from "./types";

type El = Pick<HTMLDivElement, "focus">;
const Editor = forwardRef<El, Props>(({ classes, ...props }, ref) => {
  const quillRef = useRef<TQuill>();
  useImperativeHandle(ref, () => ({
    focus: () => quillRef.current?.focus(),
  }));

  return (
    <div
      style={{ fontFamily: "inherit", fontSize: "inherit" }}
      className="w-full h-full text-base"
      ref={async (node) => {
        if (!node || quillRef.current || !Quill) return;
        const quill = new Quill(node, {
          placeholder: props.placeHolder,
          readOnly: props.readOnly,
          theme: "snow",
          formats: ["bold", "italic", "indent", "list", "link"],
          modules: {
            toolbar: [
              ["bold", "italic"],
              [{ list: "ordered" }, { list: "bullet" }, "link"],
            ],
          },
        });

        quillRef.current = quill;
        quill.setContents(to_delta(props.content.value));

        if (props.readOnly) return;

        quill.on("editor-change", function handleChange() {
          //quill content min length is 1
          const numChars = quill.getLength() - 1;
          props.onChange({
            //quill clean state has residual `\n`
            value: numChars <= 0 ? "" : JSON.stringify(quill.getContents()),
            length: numChars,
          });
        });
      }}
    />
  );
});

export default Editor;
