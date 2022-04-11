import React from "react";
import { Editor } from "draft-js";
import useEditor from "./useEditor";
import "draft-js/dist/Draft.css";
import Icon, { IconTypes } from "components/Icons/Icons";
import Label from "pages/Admin/components/Label";

function OverviewEditor() {
  const {
    editorState,
    setEditorState,
    applyBlockStyle,
    applyInlineStyle,
    handleKeyCommand,
    keyBinder,
  } = useEditor();
  return (
    <div className="text-white/80 mb-4 p-3 rounded-md bg-white/10 shadow-inner">
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
      className="p-1.5 bg-angel-blue rounded-sm hover:bg-blue-accent shadow-md"
    >
      <Icon type={_iconType} />
    </button>
  );
}

export default React.memo(OverviewEditor);
