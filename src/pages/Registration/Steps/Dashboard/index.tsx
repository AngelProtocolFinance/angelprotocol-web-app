import { Navigate, Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import { regRoutes } from "constants/routes";
import { useActionResult } from "hooks/use-action-result";
import type { ActionData, Ok } from "types/action";
import { stepLoader } from "../../data/step-loader";
import type { RegStep6 } from "../../types";
import EndowmentStatus from "./EndowmentStatus";
import Step from "./Step";

export { submitAction as action } from "./submit-action";
export { ErrorBoundary } from "components/error";
export const loader = stepLoader(6);

export default function Dashboard() {
  const fetcher = useFetcher<ActionData<Ok>>({ key: "reg-sub" });
  useActionResult(fetcher.data);
  const { data } = useLoaderData() as RegStep6;

  const { submission, init } = data;

  const isStepDisabled = fetcher.state !== "idle" || submission === "in-review";

  if (
    submission &&
    typeof submission !== "string" &&
    "endowment_id" in submission
  ) {
    return <Navigate to={`../../${regRoutes.success}`} state={data} />;
  }

  return (
    <div className="grid">
      <h3 className="text-lg mb-2">Summary</h3>
      <p className="text-sm mb-8">
        {init.status === "04" && //keep bottom margin
          "If you are happy with the details you have submitted, click continue. If you wish to check, click update as required."}
      </p>

      <Step num={1} disabled={isStepDisabled} />
      <Step num={2} disabled={isStepDisabled} />
      <Step num={3} disabled={isStepDisabled} />
      <Step num={4} disabled={isStepDisabled} />
      <Step num={5} disabled={isStepDisabled} />

      <EndowmentStatus status={submission} classes="mt-6" />
      {/** render prompts */}
      <Outlet />
    </div>
  );
}
