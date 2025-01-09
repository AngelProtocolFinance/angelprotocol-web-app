import { forwardRef } from "react";
import { ClientOnly } from "remix-utils/client-only";
import RT from "./RichText.client";
import type { Props } from "./types";

export { parseContent, toDelta, toText } from "./helpers";

export const RichText = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <ClientOnly>{() => <RT {...props} ref={ref} />}</ClientOnly>
));
