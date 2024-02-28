import { useState } from "react";
import SignupForm from "./SignupForm";
import { SignupState } from "./types";

export default function Signup() {
  const [state, setState] = useState<SignupState>("init");

  if (state === "init") return <SignupForm setSignupState={setState} />;
}
