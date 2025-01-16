import type { LinkDescriptor } from "@vercel/remix";

import quill from "quill/dist/quill.snow.css?url";
import rt from "./richtext.css?url";
export { toDelta, toContent, toText } from "./helpers";

export const richTextStyles: LinkDescriptor[] = [
  { rel: "stylesheet", href: quill },
  { rel: "stylesheet", href: rt },
];

export { RichText } from "./RichText";
