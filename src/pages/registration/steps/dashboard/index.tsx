import type { IReg } from "@better-giving/reg";
import { Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import { useActionResult } from "hooks/use-action-result";
import type { ActionData, Ok } from "types/action";
import { step_loader } from "../../data/step-loader";
import EndowmentStatus from "./endowment-status";
import Step from "./step";

export { submit_action as action } from "./submit-action";
export { ErrorBoundary } from "components/error";
export const loader = step_loader(6);

export default function Dashboard() {
  const fetcher = useFetcher<ActionData<Ok>>({ key: "reg-sub" });
  useActionResult(fetcher.data);
  const reg = useLoaderData() as IReg;

  const is_steps_disabled = fetcher.state !== "idle" || reg.status === "02";

  return (
    <div className="grid">
      <h3 className="text-lg mb-2">Summary</h3>
      <p className="text-sm mb-8">
        {reg.status === "04" && //keep bottom margin
          "If you are happy with the details you have submitted, click continue. If you wish to check, click update as required."}
      </p>

      <Step num={1} disabled={is_steps_disabled} />
      <Step num={2} disabled={is_steps_disabled} />
      <Step num={3} disabled={is_steps_disabled} />
      <Step num={4} disabled={is_steps_disabled} />
      <Step num={5} disabled={is_steps_disabled} />

      <EndowmentStatus status={reg.status} classes="mt-6" />
      {/** render prompts */}
      <Outlet />
    </div>
  );
}
