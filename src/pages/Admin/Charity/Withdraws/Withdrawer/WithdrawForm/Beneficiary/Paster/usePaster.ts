import { useEffect, useState } from "react";

type PasteResult =
  | { canPaste: true; text: string }
  | { canPaste: false; text?: never };

export default function usePaster(): PasteResult {
  const [text, setText] = useState("");

  useEffect(() => {
    const handler = async () => {
      const textToPaste = await navigator.clipboard.readText();
      setText(textToPaste);
    };

    navigator.clipboard.addEventListener("copy", handler);

    return () => navigator.clipboard.removeEventListener("copy", handler);
  }, []);

  return !text ? { canPaste: false } : { canPaste: true, text };
}
