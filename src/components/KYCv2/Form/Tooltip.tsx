import { Props } from "../types";
import { maskAddress } from "helpers";

export default function Tooltip(props: Props) {
  if (props.type === "post-donation") {
    return (
      <p className={props.classes ?? ""}>
        <span className="text-xs uppercase font-bold mb-1">
          Transaction ID:
        </span>
        <span className="font-normal text-sm ml-2">
          {maskAddress(props.txHash)}
        </span>
      </p>
    );
  }
  const {
    state: { recipient },
  } = props;

  return (
    (recipient.isKYCRequired && (
      <p className={`font-bold text-center ${props.classes ?? ""}`}>
        {recipient.name} enforces donor verification. Please provide your
        personal information below to complete your donation. You will be sent a
        tax receipt to your email address automatically
      </p>
    )) ||
    null
  );
}
