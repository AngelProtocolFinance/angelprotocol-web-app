import { SubmitStep, isCrypto } from "slices/donation";
import Crypto from "./Crypto";

export default function Submit(props: SubmitStep) {
  if (isCrypto(props)) {
    return <Crypto {...props} />;
  }
  return <></>;
}
