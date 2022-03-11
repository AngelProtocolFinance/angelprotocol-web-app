import {
  convertFromRaw,
  convertToRaw,
  DraftBlockType,
  DraftInlineStyleType,
  EditorCommand,
  EditorState,
  getDefaultKeyBinding,
  RichUtils,
} from "draft-js";
import { useCallback, useState } from "react";

export default function useEditor(
  value: string,
  onChange: (...event: any[]) => void
) {
  const [editorState, setEditorState] = useState(() =>
    getInitialEditorState(value)
  );

  //map common key commands
  const handleKeyCommand = useCallback(
    (command: EditorCommand, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }
      return "not-handled";
    },
    []
  );

  const keyBinder = useCallback(
    (e: React.KeyboardEvent) => {
      //bind tab to enable nesting of list
      if (e.code === "Tab") {
        const newEditorState = RichUtils.onTab(
          e,
          editorState,
          4 /* maxDepth */
        );
        if (newEditorState !== editorState) {
          setEditorState(newEditorState);
          return "handled";
        }
      }
      return getDefaultKeyBinding(e);
    },
    [editorState]
  );

  const applyInlineStyle = useCallback(
    (inlineStyle: DraftInlineStyleType) => () => {
      const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
      setEditorState(newState);
    },
    [editorState]
  );

  const applyBlockStyle = useCallback(
    (blockStyle: DraftBlockType) => () => {
      const newState = RichUtils.toggleBlockType(editorState, blockStyle);
      setEditorState(newState);
    },
    [editorState]
  );

  const onEditorStateChange = useCallback(
    (newEditorState: EditorState) => {
      const rawState = getRawState(newEditorState);
      onChange(rawState);
      setEditorState(newEditorState);
    },
    [onChange]
  );

  return {
    editorState,
    onChange: onEditorStateChange,
    handleKeyCommand,
    keyBinder,
    applyInlineStyle,
    applyBlockStyle,
  };
}

function getInitialEditorState(stringValue: string) {
  return !!stringValue
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(stringValue)))
    : EditorState.createEmpty();
}

function getRawState(editorState: EditorState) {
  const currentContent = editorState.getCurrentContent();
  return currentContent.hasText()
    ? JSON.stringify(convertToRaw(currentContent))
    : "";
}
