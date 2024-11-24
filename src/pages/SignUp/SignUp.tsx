import Seo from "components/Seo";
import { useRendered } from "hooks/use-rendered";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ConfirmForm from "./ConfirmForm";
import SignupForm from "./SignupForm";
import Success from "./Success";
import type { SignupState } from "./types";

export function SignUp() {
  const [params] = useSearchParams();
  const confirm = params.get("confirm");
  const [state, setState] = useState<SignupState>(
    confirm
      ? {
          type: "confirm",
          userType: "donor",
          codeRecipientEmail: {
            raw: confirm,
            obscured: confirm,
          },
        }
      : { type: "init" }
  );
  useRendered();

  const content = (() => {
    if (state.type === "init") {
      return <SignupForm setSignupState={setState} />;
    }

    if (state.type === "success") {
      return <Success userType={state.userType} />;
    }

    return (
      <ConfirmForm
        userType={state.userType}
        codeRecipientEmail={state.codeRecipientEmail}
        setSignupState={setState}
      />
    );
  })();

  return (
    <div className="grid place-items-center px-4 py-14 text-navy-l1">
      <Seo title="Sign Up - Better Giving" />
      {content}
    </div>
  );
}
