import { useEffect } from "react";

/**
 *
 * @param onResize after debounce time, will receive screen size, and ref
 * @param debounceTime in milliseconds
 * @param ref modifiable internal state
 * @param shouldRunOnLoad set to `true` to run `onResize` on first load
 */
export const SCREEN_MD = 768; /**tailwind md screen size*/

export default function useHandleScreenResize<T extends object>(
  onResize: (screenSize: number, ref: T) => void,
  debounceTime: number = 150,
  ref: T,
  shouldRunOnLoad?: boolean
) {
  useEffect(() => {
    /** track state via closure */
    let _ref = ref;
    /** on first visit */
    shouldRunOnLoad && onResize(window.innerWidth, _ref);

    const debounced = debounceCallback(function callback() {
      onResize(window.innerWidth, _ref);
    }, debounceTime);
    window.addEventListener("resize", debounced);
    return () => window.removeEventListener("resize", debounced);

    //eslint-disable-next-line
  }, []);
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
