import { useEffect, useRef, useState } from "react";

const timeout = (millis: number) => new Promise((r) => setTimeout(r, millis));

export default function useTypeWriter(
  words: string[],
  //how fast the typewritter types
  speed: number,
  //idle time to show typed words
  showTime: number
): [typedText: string, cursorShown: boolean] {
  const frameRef = useRef<number>(0);
  const wordIdxRef = useRef<number>(0);
  const charIdxRef = useRef<number>(0);
  const [text, setText] = useState("");
  const [cursorShown, showCursor] = useState(true);

  function changeWord() {
    wordIdxRef.current = (wordIdxRef.current + 1) % words.length;
    charIdxRef.current = 0;
  }

  async function typeAndDelete() {
    const currWordLength = words[wordIdxRef.current].length;
    const nextChar = words[wordIdxRef.current][charIdxRef.current];
    //use value then increment
    if (charIdxRef.current < currWordLength) {
      setText((prev) => prev + nextChar);
      charIdxRef.current++;
      if (charIdxRef.current >= currWordLength) {
        //wait a sec before popping
        await timeout(showTime);
      }
    } else {
      //once word is fully typed, start popping
      setText((prev) => {
        if (!prev) {
          changeWord();
          return "";
        } else {
          return prev.slice(0, -1);
        }
      });
    }
    //wait 100ms before typing next char
    await timeout(speed);

    showCursor((prev) => !prev);

    frameRef.current = requestAnimationFrame(typeAndDelete);
  }

  useEffect(() => {
    frameRef.current = requestAnimationFrame(typeAndDelete);
    return () => cancelAnimationFrame(frameRef.current);
    //start animation and end only before this component unmounts
    // eslint-disable-next-line
  }, []);

  return [text, cursorShown];
}
