import {
  DraftBlockType,
  DraftInlineStyleType,
  EditorCommand,
  EditorState,
  RichUtils,
  convertToRaw,
  getDefaultKeyBinding,
} from "draft-js";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { UpdateProfileValues } from "pages/EndowmentAdmin/types";
import useRichTextInit from "components/RichTextRenderer/useRichTextInit";

export default function useEditor() {
  const {
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useFormContext<UpdateProfileValues>();
  const overview = watch("overview") || "";
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useRichTextInit(overview, setEditorState);

  //everytime editorState changes, serialize it and set hook-form state
  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    if (!currentContent.hasText()) {
      setError("overview", { message: "overview required" });
      return;
    }
    const rawState = convertToRaw(currentContent);
    setValue("overview", JSON.stringify(rawState), {
      shouldDirty: true,
      shouldValidate: true,
    });
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
  //for tabbing of lists only
  function handleEditorTab(e: React.KeyboardEvent) {
    const newState = RichUtils.onTab(e, editorState, 4);
    setEditorState(newState);
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
    errors,
    editorState,
    setEditorState,
    applyBlockStyle,
    applyInlineStyle,
    handleEditorTab,
    handleKeyCommand,
    keyBinder,
  };
}
