import { type HTMLAttributes, forwardRef } from "react";
import { parseContent } from "./helpers";
import { toText } from "./helpers.client";

export interface IText
  extends Omit<HTMLAttributes<HTMLParagraphElement>, "children"> {
  children?: string;
}
const Text = forwardRef<HTMLParagraphElement, IText>((props, ref) => {
  return (
    <p {...props} ref={ref}>
      {toText(parseContent(props.children))}
    </p>
  );
});

export default Text;
