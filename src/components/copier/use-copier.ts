import { useEffect, useState } from "react";

const copy_wait_time = 700;

export function use_copier(text: string) {
  const [copied, set_copied] = useState(false);

  useEffect(() => {
    (async () => {
      if (copied) {
        await new Promise((r) => setTimeout(r, copy_wait_time));
        set_copied(false);
      }
    })();
  }, [copied]);

  async function handle_copy() {
    //write access is automatically granted on active tab
    if (!text) {
      return;
    }
    await navigator.clipboard.writeText(text);
    set_copied(true);
  }

  return { handle_copy, copied };
}
