import type { EndowClaim } from "@better-giving/registration/models";
import { Link } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { useState } from "react";
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
        state={
          endow
            ? ({
                id: endow?.id,
                name: endow?.name,
                ein: endow?.registration_number,
              } satisfies EndowClaim)
            : undefined
        }
        to={`${appRoutes.register}/welcome`}
        aria-disabled={!endow?.id}
        className="h-full flex items-center text-sm uppercase font-bold font-heading bg-blue-d1 text-white shadow-xl enabled:active:translate-x-1 hover:bg-blue-d2 rounded-full px-6 py-2 aria-disabled:bg-gray"
      >
        Get started
      </Link>
    </div>
  );
}
