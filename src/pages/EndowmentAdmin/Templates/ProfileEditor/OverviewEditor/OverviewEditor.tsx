import React from "react";
import { Editor } from "draft-js";
import useEditor from "./useEditor";
import "draft-js/dist/Draft.css";
import Icon, { IconTypes } from "components/Icons/Icons";
import { ErrorMessage } from "@hookform/error-message";

function OverviewEditor() {
  const {
    errors,
    editorState,
    setEditorState,
    applyBlockStyle,
    applyInlineStyle,
    handleKeyCommand,
    keyBinder,
  } = useEditor();
  return (
    <div className="text-black mb-4 p-3 rounded-md bg-light-grey shadow-inner-white-grey">
      <div className="flex gap-2 mt-2 mb-4">
        <Button onClick={applyInlineStyle("BOLD")} _iconType="Bold" />
        <Button _iconType="Italic" onClick={applyInlineStyle("ITALIC")} />
        <Button
          _iconType="ListUl"
          onClick={applyBlockStyle("unordered-list-item")}
        />
        <Button
          _iconType="ListOl"
          onClick={applyBlockStyle("ordered-list-item")}
        />
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={keyBinder}
        placeholder="An overview of your charity"
      />
      <ErrorMessage
        errors={errors}
        name="overview"
        as="p"
        className="font-mono font-semibold text-right text-red-400 text-xs m-1"
      />
    </div>
  );
}

function Button({
  _iconType,
  ...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  _iconType: IconTypes;
}) {
  return (
    <button
      {...restProps}
      type="button"
      className="p-1.5 text-white-grey bg-angel-blue rounded-sm hover:bg-bright-blue hover:text-white shadow-md"
    >
      <Icon type={_iconType} />
    </button>
  );
}

export default React.memo(OverviewEditor);
