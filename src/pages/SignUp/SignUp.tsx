import { useState } from "react";
import ConfirmForm from "./ConfirmForm";
import SignupForm from "./SignupForm";
import Success from "./Success";
import { SignupState } from "./types";

export default function SignUp() {
  const [state, setState] = useState<SignupState>({ type: "init" });

  const content = (() => {
    // if (state.type === "init") {
    //   return <SignupForm setSignupState={setState} />;
    // }

    // if (state.type === "success") {
    return <Success userType={"donor"} />;
    // }

    // return (
    //   <ConfirmForm
    //     userType={state.userType}
    //     codeRecipientEmail={state.codeRecipientEmail}
    //     setSignupState={setState}
    //   />
    // );
  })();

  return (
    <div className="grid place-items-center py-14 text-navy-l1">{content}</div>
  );
}
