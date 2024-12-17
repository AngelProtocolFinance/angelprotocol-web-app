import { useState } from "react";
import type { EndowmentOption } from "types/aws";
import { EndowSelector } from "./endow-selector";

export function ClaimCta() {
  const [endow, setEndow] = useState<EndowmentOption>();
  return (
    <div>
      <EndowSelector
        value={endow ?? { id: 0, name: "", registration_number: "" }}
        onChange={setEndow}
      />
    </div>
  );
}
