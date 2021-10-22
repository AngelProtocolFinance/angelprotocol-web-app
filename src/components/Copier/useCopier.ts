import { useEffect, useState } from "react";
import { Addr } from "./types";

const copyWaitTime = 700;
export default function useCopier(text?: Addr) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      if (copied) {
        await new Promise((r) => setTimeout(r, copyWaitTime));
        setCopied(false);
      }
    })();
  }, [copied]);

  async function handleCopy() {
    //write access is automatically granted on active tab
    if (!text) {
      return;
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }

  return { handleCopy, copied };
}
