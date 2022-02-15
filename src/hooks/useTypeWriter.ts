import { useEffect, useState } from "react";

type TypeWriterResult = {
  typedText: string;
  isCursorShown: boolean;
};

/**
 * Returns passed strings with a typewriter effect.
 *
 * @param strings Strings to be returned with a typewriter effect in order in which they were passed in
 * @param durationBetweenTypes How fast the typewriter types
 * @param showTime Idle time to show typed out string
 * @returns Result containing currently typed out text with a flag indicating whether Cursor should be shown
 */
export default function useTypeWriter(
  strings: string[],
  durationBetweenTypes: number,
  showTime: number
): TypeWriterResult {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isCursorShown, setCursorShown] = useState(true);
  const [reverse, setReverse] = useState(false);

  // typeWriter
  useEffect(() => {
    const shouldReverse = subIndex === strings[index].length && !reverse;

    const waitTime = shouldReverse ? showTime : durationBetweenTypes;

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % strings.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (shouldReverse) {
        setReverse(true);
      } else {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
        setCursorShown((prev) => !prev);
      }
    }, waitTime);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subIndex, index, reverse]);

  return {
    isCursorShown,
    typedText: strings[index].substring(0, subIndex),
  };
}
