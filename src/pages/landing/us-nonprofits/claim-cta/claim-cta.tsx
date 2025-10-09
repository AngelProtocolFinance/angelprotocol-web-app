import { useState } from "react";
import { Link, href } from "react-router";
import type { EndowmentOption } from "types/npo";
import { EndowSelector } from "./endow-selector";

export function ClaimCta({ classes = "" }) {
  const [endow, setEndow] = useState<EndowmentOption>();
  return (
    <div className={`flex items-center gap-x-2 gap-y-4 py-4 ${classes}`}>
      <EndowSelector
        value={endow ?? { id: 0, name: "", registration_number: "" }}
        onChange={setEndow}
      />
      <Link
        to={`${href("/register/welcome")}?claim=${endow?.registration_number}`}
        aria-disabled={!endow?.id}
        className="h-full flex items-center text-sm uppercase font-bold  bg-blue-d1 text-white shadow-xl enabled:active:translate-x-1 hover:bg-blue-d2 rounded-full px-6 py-2 aria-disabled:bg-gray"
      >
        Get started
      </Link>
    </div>
  );
}
