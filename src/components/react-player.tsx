import { type ComponentProps, Suspense, forwardRef, lazy } from "react";
import type RP from "react-player";
const Component = lazy(() => import("react-player"));

export const ReactPlayer = forwardRef<RP, ComponentProps<typeof Component>>(
  (props, ref) => {
    return (
      <Suspense>
        <Component {...props} ref={ref} />
      </Suspense>
    );
  }
);
