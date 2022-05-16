import createCounterPlugin from "@draft-js-plugins/counter";
import "@draft-js-plugins/counter/lib/plugin.css";
import Editor from "@draft-js-plugins/editor";
import { ErrorMessage } from "@hookform/error-message";
import "draft-js/dist/Draft.css";
import React from "react";
import { FieldValues, Path } from "react-hook-form";
import Icon, { IconTypes } from "components/Icons/Icons";
import useRichTextEditor from "./useRichTextEditor";

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
    editorState,
    setEditorState,
    handleKeyCommand,
    keyBinder,
    applyInlineStyle,
    applyBlockStyle,
    isSubmitting,
    errors,
  } = useRichTextEditor(props.fieldName);
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
