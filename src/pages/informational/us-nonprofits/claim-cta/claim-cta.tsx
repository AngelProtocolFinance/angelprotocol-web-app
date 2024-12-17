import { useState } from "react";
import type { EndowmentOption } from "types/aws";
import { EndowSelector } from "./endow-selector";

export function ClaimCta() {
  const [endow, setEndow] = useState<EndowmentOption>();
  return (
    <div className="">
      <p className="text-white font-bold mb-2">Claim your nonprofit</p>
      <EndowSelector
        value={endow ?? { id: 0, name: "", registration_number: "" }}
        onChange={setEndow}
      />
      <button
        disabled={!endow?.id}
        type="button"
        className="text-sm uppercase font-bold font-heading bg-blue-d1 text-white shadow-xl enabled:active:translate-x-1 hover:bg-blue-d2 rounded-full px-4 py-2 self-start justify-self-start mt-2 disabled:bg-gray"
      >
        continue
      </button>
    </div>
  );
}
