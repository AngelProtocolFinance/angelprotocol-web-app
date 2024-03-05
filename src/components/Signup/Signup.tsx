import { useState } from "react";
import ConfirmForm from "./ConfirmForm";
import SignupForm from "./SignupForm";
import Success from "./Success";
import { Donor, SignupState } from "./types";

type Props = { classes?: string; donor?: Donor };

export default function Signup({ classes = "", donor }: Props) {
  const [state, setState] = useState<SignupState>({ type: "init" });

  // if (state.type === "init")
  //   return (
  //     <SignupForm setSignupState={setState} donor={donor} classes={classes} />
  //   );

  // if (state.type === "success")
  //   return <Success classes={classes} userType={state.userType} />;

  return (
    <ConfirmForm
      userType={"donor"}
      codeRecipientEmail={{ obscured: "...@sdf.com", raw: "sdf@asdf.com" }}
      setSignupState={setState}
      classes={classes}
    />
  );
}
