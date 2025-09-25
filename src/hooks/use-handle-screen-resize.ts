import { useEffect } from "react";

/**
 * tailwind screen sizes
 * @see {@link https://tailwindcss.com/docs/responsive-design}
 */
export const SCREEN_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
};

type Options<T extends object> = {
  should_call_onresize_onload?: boolean;
  should_attach_listener?: boolean;
  debounce_time?: number;
  ref?: T;
};

export function use_handle_screen_resize<T extends object>(
  on_resize: (screenSize: number, ref: T) => void,
  options?: Options<T>
) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: called only on page load
  useEffect(() => {
    const {
      should_attach_listener,
      should_call_onresize_onload,
      debounce_time,
      ref = {} as T,
    } = options || {};

    /** track state */
    /** on first visit */
    if (should_call_onresize_onload) {
      on_resize(window.innerWidth, ref);
    }

    if (!should_attach_listener) return;

    const handler = debounce_time
      ? debounce_callback(function callback() {
          on_resize(window.innerWidth, ref);
        }, debounce_time)
      : function callback() {
          on_resize(window.innerWidth, ref);
        };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [options?.should_attach_listener]);
}

type Fn = (...args: any[]) => void;
function debounce_callback(callback: Fn, msDelay: number): Fn {
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
