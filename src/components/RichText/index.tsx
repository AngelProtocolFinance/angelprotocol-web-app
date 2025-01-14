import { forwardRef } from "react";
import { ClientOnly } from "remix-utils/client-only";
import RT from "./RichText.client";
import type { Props } from "./types";

export { toDelta, toText } from "./helpers.client";
export { parseContent } from "./parse-content";

export const RichText = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <ClientOnly>{() => <RT {...props} ref={ref} />}</ClientOnly>
));
