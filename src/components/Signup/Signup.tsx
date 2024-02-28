import { useState } from "react";
import ConfirmForm from "./ConfirmForm";
import SignupForm from "./SignupForm";
import Success from "./Success";
import { SignupState } from "./types";

type Props = { classes?: string };

export default function Signup({ classes = "" }: Props) {
  const [state, setState] = useState<SignupState>("init");

  if (state === "init")
    return (
      <SignupForm
        setSignupState={setState}
        firstName="testfirst"
        lastName="testlast"
        email="testttestx123@gmail.com"
        classes={classes}
      />
    );

  if (state === "success") return <Success classes={classes} />;

  return (
    <ConfirmForm
      codeRecipientEmail={state.codeRecipientEmail}
      setSignupState={setState}
      classes={classes}
    />
  );
}
