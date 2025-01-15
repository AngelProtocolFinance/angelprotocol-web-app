import { Suspense, forwardRef, lazy } from "react";
const RT = lazy(() => import("./RichText"));
const T = lazy(() => import("./Text"));
import type { LinkDescriptor } from "@vercel/remix";
import type { IText } from "./Text";
import type { Props } from "./types";

import quill from "quill/dist/quill.core.css?url";
import rt from "./richtext.css?url";

export { toDelta, parseContent } from "./helpers";
export { toText } from "./helpers.client";

export const richTextStyles: LinkDescriptor[] = [
  { rel: "stylesheet", href: quill },
  { rel: "stylesheet", href: rt },
];

export const RichText = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <Suspense>
    <RT {...props} ref={ref} />
  </Suspense>
));

export const Text = forwardRef<HTMLParagraphElement, IText>((props, ref) => (
  <Suspense>
    <T {...props} ref={ref} />
  </Suspense>
));
