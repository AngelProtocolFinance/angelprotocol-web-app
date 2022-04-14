import { Editor, EditorState } from "draft-js";
import { useState } from "react";
import useRichTextInit from "./useRichTextInit";

export default function RichTextRenderer(props: { text: string }) {
  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );
  useRichTextInit(props.text, setEditorState);
  return (
    <Editor editorState={editorState} onChange={() => {}} readOnly={true} />
  );
}
