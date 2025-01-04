import { Outlet, ScrollRestoration, useNavigation } from "@remix-run/react";
import nProgress from "nprogress";
import { useEffect } from "react";
import { Toaster } from "sonner";

nProgress.configure({
  showSpinner: false,
});

export default function RootLayout() {
  const transition = useNavigation();
  useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (transition.state === "idle") nProgress.done();
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else nProgress.start();
  }, [transition.state]);

  return (
    <>
      <ScrollRestoration />
      <Outlet />
      <Toaster richColors position="top-right" closeButton />
    </>
  );
}
