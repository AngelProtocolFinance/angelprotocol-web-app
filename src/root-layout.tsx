import { Links, Meta, Scripts, ScrollRestoration } from "@remix-run/react";
import type { PropsWithChildren } from "react";
import { ClientOnly } from "remix-utils/client-only";
import { ExternalScripts } from "remix-utils/external-scripts";
import { Toaster } from "sonner";
import { useNProgress } from "use-nprogress";

export function Layout({ children }: PropsWithChildren<{ classes?: string }>) {
  useNProgress();
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <Meta />
        <Links />
        <style />
      </head>
      <body className="grid min-h-screen grid-rows-[1fr_0]">
        {children}
        <ScrollRestoration />
        <Scripts />
        <ClientOnly>{() => <ExternalScripts />}</ClientOnly>
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
