import type { LinkDescriptor } from "react-router";

import quill from "quill/dist/quill.snow.css?url";
import rt from "./richtext.css?url";
export { to_delta, to_content, toText } from "./helpers";

export const richtext_styles: LinkDescriptor[] = [
  { rel: "stylesheet", href: quill },
  { rel: "stylesheet", href: rt },
];

export { RichText } from "./rich-text";
