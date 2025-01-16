import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import nProgress from "nprogress";
import { type PropsWithChildren, useEffect } from "react";
import { Toaster } from "sonner";
import { useCookieConsent } from "./use-cookie-consent";

export function Layout({ children }: PropsWithChildren<{ classes?: string }>) {
  const transition = useNavigation();
  useEffect(() => {
    nProgress.configure({ showSpinner: false });
    // when the state is idle then we can to complete the progress bar
    if (transition.state === "idle") nProgress.done();
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else nProgress.start();
  }, [transition.state]);

  useCookieConsent();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
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
