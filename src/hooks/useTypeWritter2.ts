import { useEffect, useState } from "react";

export default function useTypeWriter(
  strings: string[],
  //how fast the typewritter types
  durationBetweenTypes: number,
  //idle time to show typed words
  showTime: number
): [typedText: string, cursorShown: boolean] {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");

  // typeWriter
  useEffect(() => {
    if (
      index === strings.length - 1 &&
      subIndex === strings[index].length &&
      !reverse
    ) {
      setReverse(true);
      return;
    }

    if (
      subIndex === strings[index].length + 1 &&
      index !== strings.length - 1 &&
      !reverse
    ) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % strings.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
      setText(strings[index].substring(0, subIndex));
    }, durationBetweenTypes);

    setBlink((prev) => !prev);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, durationBetweenTypes, strings]);

  return [text, blink];
}
