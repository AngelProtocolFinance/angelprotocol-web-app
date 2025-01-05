import {
  Links,
  Meta,
  Scripts,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import nProgress from "nprogress";
import { type PropsWithChildren, useEffect } from "react";
import { ScrollRestoration } from "react-router-dom";
import { Toaster, toast as notify } from "sonner";
nProgress.configure({
  showSpinner: false,
});
export function Layout({ children }: PropsWithChildren) {
  const { toast } = useLoaderData<any>() ?? {};
  const transition = useNavigation();
  useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (transition.state === "idle") nProgress.done();
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else nProgress.start();
  }, [transition.state]);

  useEffect(() => {
    if (toast?.type === "error") {
      notify.error(toast.message);
    }
    if (toast?.type === "success") {
      notify.success(toast.message);
    }
  }, [toast]);
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <Meta />
        <Links />
      </head>
      <body>
        <ScrollRestoration />
        {children}
        <Scripts />
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
