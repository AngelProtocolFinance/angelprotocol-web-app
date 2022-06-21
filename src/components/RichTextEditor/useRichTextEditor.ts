import {
  DraftBlockType,
  DraftInlineStyleType,
  EditorCommand,
  EditorState,
  RichUtils,
  convertToRaw,
  getDefaultKeyBinding,
} from "draft-js";
import "draft-js/dist/Draft.css";
import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import useRichTextInit from "components/RichTextRenderer/useRichTextInit";

export default function useRichTextEditor(fieldName: string) {
  const {
    formState: { errors, isSubmitting },
    field: { onChange, value },
  } = useController({ name: fieldName });

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  //init rich text editor
  useRichTextInit(value, setEditorState);

  //everytime editorState changes, serialize it and set hook-form state
  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    if (!currentContent.hasText()) {
      onChange("");
      return;
    }
    onChange(JSON.stringify(convertToRaw(currentContent)));
    //eslint-disable-next-line
  }, [editorState]);

  //map common key commands
  function handleKeyCommand(command: EditorCommand, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  }

  //bind tab to enable nesting of list
  function keyBinder(e: React.KeyboardEvent) {
    if (e.code === "Tab" /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
        return "handled";
      }
    }
    return getDefaultKeyBinding(e);
  }

  const applyInlineStyle = (inlineStyle: DraftInlineStyleType) => () => {
    const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
    setEditorState(newState);
  };

  const applyBlockStyle = (blockStyle: DraftBlockType) => () => {
    const newState = RichUtils.toggleBlockType(editorState, blockStyle);
    setEditorState(newState);
  };

  return {
    editorState,
    setEditorState,
    keyBinder,
    handleKeyCommand,
    applyInlineStyle,
    applyBlockStyle,
    errors,
    isSubmitting,
  };
}
