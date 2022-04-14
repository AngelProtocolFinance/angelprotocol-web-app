import { Editor } from "draft-js";
import "draft-js/dist/Draft.css";
import { PropsWithChildren, useMemo } from "react";
import { IconType } from "react-icons";
import { BiBold, BiItalic } from "react-icons/bi";
import { FaListOl, FaListUl } from "react-icons/fa";
import useEditor from "./useEditor";

type Props = {
  value: string;
  placeholder?: string;
  onChange: (...event: any[]) => void;
  disabled?: true | boolean;
};

export default function EditorComponent(props: Props) {
  const {
    editorState,
    onChange,
    handleKeyCommand,
    keyBinder,
    applyBlockStyle,
    applyInlineStyle,
  } = useEditor(props.value, props.onChange);

  const placeholderProp = useMemo(() => {
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        return {};
      }
    }
    return { placeholder: props.placeholder };
  }, [editorState, props.placeholder]);

  return (
    <Container>
      <IconContainer>
        <IconButton Icon={BiBold} onClick={applyInlineStyle("BOLD")} />
        <IconButton Icon={BiItalic} onClick={applyInlineStyle("ITALIC")} />
        <IconButton
          Icon={FaListUl}
          onClick={applyBlockStyle("unordered-list-item")}
        />
        <IconButton
          Icon={FaListOl}
          onClick={applyBlockStyle("ordered-list-item")}
        />
      </IconContainer>
      <Editor
        editorState={editorState}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={keyBinder}
        {...placeholderProp}
      />
    </Container>
  );
}

const Container = ({ children }: PropsWithChildren<{}>) => (
  <div className="text-white/80 p-3 rounded-md bg-white/10 shadow-inner">
    {children}
  </div>
);

const IconContainer = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex gap-2 mt-2 mb-4">{children}</div>
);

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
