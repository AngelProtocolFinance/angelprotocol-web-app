import { useLoaderData } from "react-router";
import InitForm from "./InitForm";
import SetPasswordForm from "./SetPasswordForm";
import Success from "./Success";
import type { LoaderData } from "./types";

export default function ResetPassword() {
  const { state, step } = useLoaderData<LoaderData>();

  const content = (() => {
    if (step.type === "init") {
      return <InitForm state={state} />;
    }

    if (step.type === "set-password") {
      const { type, ...recipient } = step;
      return <SetPasswordForm recipient={recipient} />;
    }

    return <Success state={state} />;
  })();

  return (
    <div className="grid place-items-center px-4 py-14 text-navy-l1">
      {content}
    </div>
  );
}
