import { useState } from "react";
import ConfirmForm from "./ConfirmForm";
import SignupForm from "./SignupForm";
import Success from "./Success";
import { Donor, SignupState } from "./types";

type Props = { classes?: string; donor: Donor };

export default function Signup({ classes = "", donor }: Props) {
  const [state, setState] = useState<SignupState>("init");

  if (state === "init")
    return (
      <SignupForm setSignupState={setState} donor={donor} classes={classes} />
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
