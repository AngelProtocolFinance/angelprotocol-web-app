import { useEffect } from "react";

/**
 * tailwind screen sizes
 * @see {@link https://tailwindcss.com/docs/responsive-design}
 */
export const SCREEN_WIDTHS = {
  sm: 640,
  md: 768,
  lg: 1024,
};

type Options<T extends object> = {
  shouldCallOnResizeOnLoad?: boolean;
  shouldAttachListener?: boolean;
  debounceTime?: number;
  ref?: T;
};

export default function useHandleScreenResize<T extends object>(
  onResize: (screenSize: number, ref: T) => void,
  options?: Options<T>
) {
  useEffect(() => {
    const {
      shouldAttachListener,
      shouldCallOnResizeOnLoad,
      debounceTime,
      ref = {} as T,
    } = options || {};

    /** track state */
    /** on first visit */
    if (shouldCallOnResizeOnLoad) {
      onResize(window.innerWidth, ref);
    }

    if (!shouldAttachListener) return;

    const handler = debounceTime
      ? debounceCallback(function callback() {
          onResize(window.innerWidth, ref);
        }, debounceTime)
      : function callback() {
          onResize(window.innerWidth, ref);
        };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);

    //eslint-disable-next-line
  }, [options?.shouldAttachListener]);
}

type Fn = (...args: any[]) => void;
function debounceCallback(callback: Fn, msDelay: number): Fn {
  let timeout: number | undefined;

  const debounced: Fn = (args) => {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => {
      callback.apply(null, args);
    }, msDelay);
  };

  return debounced;
}
