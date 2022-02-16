import { useEffect, useMemo, useState } from "react";

type TypeWriterResult = {
  typedText: string;
  isCursorShown: boolean;
};

/**
 * Returns passed strings with a typewriter effect.
 *
 * @param strings Strings to be returned with a typewriter effect in order in which they were passed in
 * @param durationBetweenTypes How fast the typewriter types
 * @param idleTime Idle time to show typed out string
 *
 * @returns Result containing currently typed out text with a flag indicating whether Cursor should be shown
 */
export default function useTypeWriter(
  strings: string[],
  durationBetweenTypes: number,
  idleTime: number
): TypeWriterResult {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isCursorShown, setCursorShown] = useState(true);
  const [inReverse, setReverse] = useState(false);
  const currentString = useMemo(() => strings[index] || "", [strings, index]);

  useEffect(() => {
    const shouldReverse = charIndex === currentString.length && !inReverse;
    const delay = shouldReverse ? idleTime : durationBetweenTypes;

    // if we were going in reverse and are at the beginning of the string,
    // start printing the next string (or first one if we finished printing the last string)
    // and print it in the non-reverse direction
    if (charIndex === 0 && inReverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % strings.length);
      return;
    }

    // after the set delay, reverse direction if necessary,
    // otherwise move the char index to the next char and toggle cursor visibility
    const timeout = setTimeout(() => {
      if (shouldReverse) {
        setReverse(true);
      } else {
        setCharIndex((prev) => prev + (inReverse ? -1 : 1));
        setCursorShown((prev) => !prev);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    currentString,
    inReverse,
    strings,
    durationBetweenTypes,
    idleTime,
  ]);

  return {
    isCursorShown,
    typedText: currentString.substring(0, charIndex),
  };
}
