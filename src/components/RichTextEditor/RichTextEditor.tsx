import createCounterPlugin from "@draft-js-plugins/counter";
import "@draft-js-plugins/counter/lib/plugin.css";
import Editor from "@draft-js-plugins/editor";
import { ErrorMessage } from "@hookform/error-message";
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
import { FieldValues, Path, useController } from "react-hook-form";
import Icon, { IconTypes } from "components/Icons/Icons";
import useRichTextInit from "components/RichTextRenderer/useRichTextInit";

export type EditorClasses = {
  container?: string;
  control?: string;
  controlContainer?: string;
  error?: string;
};

const counterPlugin = createCounterPlugin();
const { WordCounter } = counterPlugin;

export default function RichTextEditor<T extends FieldValues>(props: {
  fieldName: Path<T>;
  editorClasses?: EditorClasses;
  placeHolder?: string;
}) {
  const {
    formState: { errors, isSubmitting },
    field: { onChange, value },
  } = useController({ name: props.fieldName });

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

  return (
    <>
      <div className={props.editorClasses?.container}>
        <div className={props.editorClasses?.controlContainer}>
          <Button
            _classes={props.editorClasses?.control}
            onClick={applyInlineStyle("BOLD")}
            _iconType="Bold"
          />
          <Button
            _classes={props.editorClasses?.control}
            _iconType="Italic"
            onClick={applyInlineStyle("ITALIC")}
          />
          <Button
            _classes={props.editorClasses?.control}
            _iconType="ListUl"
            onClick={applyBlockStyle("unordered-list-item")}
          />
          <Button
            _classes={props.editorClasses?.control}
            _iconType="ListOl"
            onClick={applyBlockStyle("ordered-list-item")}
          />
        </div>
        <Editor
          plugins={[counterPlugin]}
          readOnly={isSubmitting}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBinder}
          placeholder={props.placeHolder}
        />
        <div className="font-thin text-xs text-right">
          <span className="uppercase">words : </span>
          <WordCounter />
        </div>
      </div>
      <ErrorMessage
        errors={errors}
        name={props.fieldName as any}
        as="p"
        className={props.editorClasses?.error}
      />
    </>
  );
}

function Button({
  _classes,
  _iconType,
  ...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  _classes?: string;
  _iconType: IconTypes;
}) {
  return (
    <button {...restProps} type="button" className={_classes}>
      <Icon type={_iconType} />
    </button>
  );
}
