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
  const { recipient } = props;

  return (
    (recipient.isKYCRequired && (
      <p
        className={`font-heading font-bold text-center ${props.classes ?? ""}`}
      >
        {recipient.name} enforces donor verification. Please provide your
        personal information below to complete your donation. You will be sent a
        tax receipt to your email address automatically
      </p>
    )) || (
      <p
        className={`font-heading font-bold text-center ${props.classes ?? ""}`}
      >
        Please fill in your personal information below if you want to be sent a
        tax receipt. You can leave the form blank if you don't want one
      </p>
    )
  );
}
