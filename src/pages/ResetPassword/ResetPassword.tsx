import { useState } from "react";
import ConfirmEmailForm from "./ConfirmEmailForm";
import Success from "./Success";
import { Steps } from "./types";
import ConfirmEmailForm from "./ConfirmEmailForm";

export default function ResetPassword() {
  const [step, setStep] = useState<Steps>({ type: "init" });

  const content = (() => {
    if (step.type === "init") {
      return <ConfirmEmailForm setStep={setStep} />;
    }

    if (step.type === "success") {
      return <Success />;
    }

    return (
      <ConfirmForm
        userType={step.userType}
        codeRecipientEmail={step.codeRecipientEmail}
        setSignupState={setStep}
      />
    );
  })();

  return (
    <div className="grid place-items-center px-4 py-14 text-navy-l1">
      {content}
    </div>
  );
}
