import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import InitForm from "./InitForm";
import SetPasswordForm from "./SetPasswordForm";
import Success from "./Success";
import type { Steps } from "./types";

export function ResetPassword() {
  const state = useLoaderData();
  const [step, setStep] = useState<Steps>({ type: "init" });

  const content = (() => {
    if (step.type === "init") {
      return <InitForm setStep={setStep} state={state} />;
    }

    if (step.type === "set-password") {
      return (
        <SetPasswordForm
          setStep={setStep}
          codeRecipientEmail={step.codeRecipientEmail}
        />
      );
    }

    return <Success state={state} />;
  })();

  return (
    <div className="grid place-items-center px-4 py-14 text-navy-l1">
      {content}
    </div>
  );
}
