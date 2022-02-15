import React from "react";
import { IconType } from "react-icons";
import { BiBold, BiItalic } from "react-icons/bi";
import { FaListUl, FaListOl } from "react-icons/fa";
import { Editor } from "draft-js";
import Label from "../../Label";
import useEditor from "./useEditor";
import "draft-js/dist/Draft.css";

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
    <div className="text-white text-opacity-80 mb-4 p-3 rounded-md bg-white bg-opacity-10 shadow-inner">
      <Label id="editor__" text="Overview" />
      <div className="flex gap-2 mt-2 mb-4">
        <Control Icon={BiBold} onClick={applyInlineStyle("BOLD")} />
        <Control Icon={BiItalic} onClick={applyInlineStyle("ITALIC")} />
        <Control
          Icon={FaListUl}
          onClick={applyBlockStyle("unordered-list-item")}
        />
        <Control
          Icon={FaListOl}
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

function Control(props: { onClick: () => void; Icon: IconType }) {
  return (
    <button
      type="button"
      className="p-1.5 bg-angel-blue rounded-sm hover:bg-blue-accent shadow-md"
      onClick={props.onClick}
    >
      <props.Icon />
    </button>
  );
}

export default React.memo(OverviewEditor);
