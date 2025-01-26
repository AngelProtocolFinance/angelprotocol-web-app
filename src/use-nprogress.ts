import { useNavigation } from "@remix-run/react";
import np from "nprogress";
import { useEffect } from "react";

export const useNProgress = () => {
  const { state } = useNavigation();

  useEffect(() => {
    np.configure({ showSpinner: false });
  }, []);

  useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (state === "idle") np.done();
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else np.start();
  }, [state]);
};
