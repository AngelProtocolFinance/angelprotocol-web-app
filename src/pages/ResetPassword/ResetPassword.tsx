import { useState } from "react";
import ConfirmEmailForm from "./ConfirmEmailForm";
import NewPasswordForm from "./NewPasswordForm";
import Success from "./Success";
import { Steps } from "./types";

export default function ResetPassword() {
  const [step, setStep] = useState<Steps>({ type: "init" });

  const content = (() => {
    if (step.type === "init") {
      return <ConfirmEmailForm setStep={setStep} />;
    }
    if (step.type === "new-password") {
      return (
        <NewPasswordForm
          setStep={setStep}
          codeRecipientEmail={step.codeRecipientEmail}
        />
      );
    }

    return <Success />;
  })();

  return (
    <div className="grid place-items-center px-4 py-14 text-navy-l1">
      {content}
    </div>
  );
}
