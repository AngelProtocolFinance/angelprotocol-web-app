import { apes } from "api/api";
import { appRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { toWithState } from "helpers/state-params";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DonationIntent } from "types/aws";

type Props = { intentId: string; classes?: string };
export default function IntentResumer({ intentId, classes }: Props) {
  const navigate = useNavigate();
  const { handleError } = useErrorContext();
  const [state, setState] = useState<"pending">();

  async function resumeIntent() {
    try {
      setState("pending");
      const intent = await apes
        .get<DonationIntent.ToResume>(`donation-intents/${intentId}`)
        .json();
      navigate(
        toWithState(`${appRoutes.donate}/${intent.endowmentId}`, intent)
      );
    } catch (err) {
      handleError(err, "parsed");
    } finally {
      setState(undefined);
    }
  }
  return (
    <button
      disabled={state === "pending"}
      type="button"
      className={`${classes} btn-blue px-3 py-1 text-xs`}
      onClick={resumeIntent}
    >
      {state === "pending" ? "Loading..." : "Finish paying"}
    </button>
  );
}
