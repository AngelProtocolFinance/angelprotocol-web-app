import {
  convertFromRaw,
  convertToRaw,
  DraftBlockType,
  DraftInlineStyleType,
  Editor,
  EditorCommand,
  EditorState,
  getDefaultKeyBinding,
  RichUtils,
} from "draft-js";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IconType } from "react-icons";
import { BiBold, BiItalic } from "react-icons/bi";
import { FaListOl, FaListUl } from "react-icons/fa";

type Props = { name: string; disabled?: true | boolean };

export default function RichEditor({ name, disabled }: Props) {
  const { control } = useFormContext();
  const [editorState, setEditorState] = useState(() =>
    getInitialEditorState(control._formValues[name])
  );

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
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => {
        return (
          <div className="text-white text-opacity-80 mb-4 p-3 rounded-md bg-white bg-opacity-10 shadow-inner">
            <div className="flex gap-2 mt-2 mb-4">
              <IconButton Icon={BiBold} onClick={applyInlineStyle("BOLD")} />
              <IconButton
                Icon={BiItalic}
                onClick={applyInlineStyle("ITALIC")}
              />
              <IconButton
                Icon={FaListUl}
                onClick={applyBlockStyle("unordered-list-item")}
              />
              <IconButton
                Icon={FaListOl}
                onClick={applyBlockStyle("ordered-list-item")}
              />
            </div>
            <Editor
              editorState={editorState}
              onChange={(newEditorState) => {
                const rawState = getRawState(newEditorState);
                console.log(rawState);

                onChange(rawState);
                setEditorState(newEditorState);
              }}
              handleKeyCommand={handleKeyCommand}
              keyBindingFn={keyBinder}
              placeholder="An overview of your charity"
            />
          </div>
        );
      }}
    />
  );
}

function IconButton(props: { onClick: () => void; Icon: IconType }) {
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

function getInitialEditorState(stringValue: string) {
  return !!stringValue
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(stringValue)))
    : EditorState.createEmpty();
}

function getRawState(editorState: EditorState) {
  const rawState = convertToRaw(editorState.getCurrentContent());
  return rawState.blocks.some((block) => !!block.text)
    ? JSON.stringify(rawState)
    : "";
}
