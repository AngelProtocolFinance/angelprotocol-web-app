import React, { useEffect, useRef, useState } from "react";
import {
  EditorState,
  RichUtils,
  EditorCommand,
  DraftInlineStyleType,
  DraftBlockType,
  convertToRaw,
  convertFromRaw,
  ContentState,
  getDefaultKeyBinding,
} from "draft-js";
import { useFormContext } from "react-hook-form";
import { EditableProfileAttr } from "services/aws/endowments/types";

export default function useEditor() {
  const { setValue, watch, getValues } = useFormContext<EditableProfileAttr>();
  const overview = watch("charity_overview");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const parseStatusRef = useRef<"init" | "error" | "success">("init");

  //initialization of rt content, with edge of db content not yet in rt format
  useEffect(() => {
    (async () => {
      const initialOverview = getValues("charity_overview");
      try {
        if (
          parseStatusRef.current === "error" ||
          parseStatusRef.current === "success"
        ) {
          return;
        }
        const rawContent = JSON.parse(initialOverview);
        //if parsing is successful, "charity_overview" saved in db is already rich text
        parseStatusRef.current = "success";
        const contentState = convertFromRaw(rawContent);
        setEditorState(EditorState.createWithContent(contentState));
      } catch (err) {
        if (err instanceof SyntaxError) {
          parseStatusRef.current = "error";
          setEditorState(
            EditorState.createWithContent(
              ContentState.createFromText(initialOverview)
            )
          );
        }
      }
    })();
  }, [overview]);

  //everytime editorState changes, serialize it and set hook-form state
  useEffect(() => {
    const rawState = convertToRaw(editorState.getCurrentContent());
    setValue("charity_overview", JSON.stringify(rawState));
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
    editorState,
    setEditorState,
    applyBlockStyle,
    applyInlineStyle,
    handleEditorTab,
    handleKeyCommand,
    keyBinder,
  };
}
