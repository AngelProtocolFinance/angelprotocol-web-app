import { useState } from "react";
import ConfirmForm from "./ConfirmForm";
import SignupForm from "./SignupForm";
import { SignupState } from "./types";

export default function Signup() {
  const [state, setState] = useState<SignupState>("init");

  if (state === "init")
    return (
      <SignupForm
        setSignupState={setState}
        firstName="testfirst"
        lastName="testlast"
        email="testttestx123@gmail.com"
      />
    );
  if (state === "success") return <p>login!!</p>;

  return (
    <ConfirmForm
      codeRecipientEmail={state.codeRecipientEmail}
      setSignupState={setState}
    />
  );
}
