import useRichTextInit from "./useRichTextInit";
import { Editor, EditorState } from "draft-js";
import { useState } from "react";

export default function RichTextRenderer(props: { text: string }) {
  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );
  useRichTextInit(props.text, setEditorState);
  return (
    <Editor editorState={editorState} onChange={() => {}} readOnly={true} />
  );
}
