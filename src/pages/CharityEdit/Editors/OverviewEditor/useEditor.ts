import React, { useEffect, useState } from "react";
import {
  EditorState,
  RichUtils,
  EditorCommand,
  DraftInlineStyleType,
  DraftBlockType,
  convertToRaw,
  getDefaultKeyBinding,
} from "draft-js";
import { useFormContext } from "react-hook-form";
import { EditableProfileAttr } from "services/aws/endowments/types";
import useRichTextInit from "components/RichTextRenderer/useRichTextInit";
import { CharityParam } from "pages/CharityEdit/types";
import { useParams } from "react-router-dom";
import { useProfileState } from "services/aws/endowments/states";

export default function useEditor() {
  const params = useParams<CharityParam>();
  const { setValue, watch } = useFormContext<EditableProfileAttr>();
  const overview = watch("charity_overview");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { profileState } = useProfileState(params.address!);

  useRichTextInit(overview, setEditorState);

  //everytime editorState changes, serialize it and set hook-form state
  useEffect(() => {
    const rawState = convertToRaw(editorState.getCurrentContent());
    const dirty =
      JSON.stringify(rawState).length !== profileState.charity_overview.length;
    setValue("charity_overview", JSON.stringify(rawState), {
      shouldDirty: dirty,
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
    editorState,
    setEditorState,
    applyBlockStyle,
    applyInlineStyle,
    handleEditorTab,
    handleKeyCommand,
    keyBinder,
  };
}
