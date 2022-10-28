import "quill/dist/quill.bubble.css";
import RichText, { EditorClasses } from "./RichText";

type Props = { value: string; classes?: EditorClasses };

export function RichTextView(props: Props) {
  return <RichText content={props.value} classes={props.classes} readOnly />;
}
