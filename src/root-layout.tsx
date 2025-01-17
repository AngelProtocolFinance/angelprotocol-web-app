import { Links, Meta, Scripts, ScrollRestoration } from "@remix-run/react";
import type { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { useCookieConsent } from "use-cookie-consent";
import { useNProgress } from "use-nprogress";

export function Layout({ children }: PropsWithChildren<{ classes?: string }>) {
  useNProgress();
  useCookieConsent();
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <Links />
        <Meta />
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
