import { apes } from "api/api";
import PromptV2, { type IPromptV2 } from "components/Prompt";
import { appRoutes } from "constants/routes";
import { errorPrompt } from "contexts/ErrorContext";
import { toWithState } from "helpers/state-params";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { DonationIntent } from "types/aws";

type Props = { intentId: string; classes?: string };
export default function IntentResumer({ intentId, classes }: Props) {
  const navigate = useNavigate();
  const [state, setState] = useState<"pending">();
  const [prompt, setPrompt] = useState<IPromptV2>();

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
      setPrompt(errorPrompt(err, "parsed"));
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
      {prompt && <PromptV2 {...prompt} onClose={() => setPrompt(undefined)} />}
    </button>
  );
}
