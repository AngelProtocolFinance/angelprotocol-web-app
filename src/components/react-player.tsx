import { type ComponentProps, forwardRef } from "react";
/*
 * importing react-player access document object which errors out in SSR,
 * but this is okay, as it would be rendered on the client eventually
 * @see https://react.dev/reference/react/Suspense#providing-a-fallback-for-server-errors-and-client-only-content */
import Wrapped from "react-player";
import { ClientOnly } from "remix-utils/client-only";
import ContentLoader from "./ContentLoader";

export const ReactPlayer = forwardRef<Wrapped, ComponentProps<typeof Wrapped>>(
  (props, ref) => {
    const { height, width } = props;
    return (
      <ClientOnly fallback={<ContentLoader style={{ height, width }} />}>
        {() => <Wrapped {...props} ref={ref} />}
      </ClientOnly>
    );
  }
);
