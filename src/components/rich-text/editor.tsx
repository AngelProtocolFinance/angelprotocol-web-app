/*
 * importing quill access document object which errors out in SSR,
 * but this is okay, as it would be rendered on the client eventually
 * @see https://react.dev/reference/react/Suspense#providing-a-fallback-for-server-errors-and-client-only-content */

import Quill from "quill";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { toDelta } from "./helpers";
import type { Props } from "./types";

type El = Pick<HTMLDivElement, "focus">;
const Editor = forwardRef<El, Props>(({ classes, ...props }, ref) => {
  const quillRef = useRef<Quill>();
  useImperativeHandle(ref, () => ({
    focus: () => quillRef.current?.focus(),
  }));

  return (
    <div
      style={{ fontFamily: "inherit", fontSize: "inherit" }}
      className="w-full h-full text-base"
      ref={(node) => {
        if (!node || quillRef.current) return;
        const quill = new Quill(node, {
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

        quillRef.current = quill;
        quill.setContents(toDelta(props.content.value));

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
