import { useEffect, useState } from "react";

const copyWaitTime = 700;

export default function useCopier() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      if (copied) {
        await new Promise((r) => setTimeout(r, copyWaitTime));
        setCopied(false);
      }
    })();
  }, [copied]);

  async function handleCopy(text: string) {
    //write access is automatically granted on active tab
    if (!text) {
      return;
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }

  return { handleCopy, copied };
}
