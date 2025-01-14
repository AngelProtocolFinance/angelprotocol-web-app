import { Suspense, forwardRef, lazy } from "react";
const RT = lazy(() => import("./RichText"));
import type { Props } from "./types";

export { toDelta, parseContent } from "./helpers";
export { toText } from "./helpers.client";

export const RichText = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <Suspense>
    <RT {...props} ref={ref} />
  </Suspense>
));
