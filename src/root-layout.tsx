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

export function Layout({ children }: PropsWithChildren<{ classes?: string }>) {
  const { toast } = useLoaderData<any>() ?? {};
  const transition = useNavigation();
  useEffect(() => {
    nProgress.configure({ showSpinner: false });
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
      <body className="grid min-h-screen grid-rows-[1fr_0]">
        <ScrollRestoration />
        {children}
        <Scripts />
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
