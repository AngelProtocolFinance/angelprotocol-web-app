import { type IToken, is_custom } from "@better-giving/crypto";
import { Copier } from "components/copier";
import { logo_url } from "constants/common";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  classes?: string;
  token: IToken;
  recipient: string;
  extraId: string | null;
}

export function PayQr({ classes = "", ...props }: Props) {
  return (
    <div className={`${classes} grid justify-items-center`}>
      <QRCodeSVG
        imageSettings={{
          src: logo_url(props.token.logo, is_custom(props.token.id)),
          height: 20,
          width: 20,
          excavate: true,
        }}
        value={props.recipient}
        className="mb-3.5"
        size={192}
      />
      <p className="text-sm mb-4">{props.recipient}</p>
      <Copier
        text={props.recipient}
        classes={{
          container:
            "flex items-center gap-2 px-2 py-1.5 rounded-md border border-gray-l3 shadow-md shadow-black/5",
          icon: "size-5",
        }}
      >
        <span className="capitalize text-sm">Copy address</span>
      </Copier>
      {props.extraId && <Memo classes="mt-4" val={props.extraId} />}
    </div>
  );
}

interface IMemo {
  val: string;
  classes?: string;
}
function Memo({ val, classes = "" }: IMemo) {
  return (
    <div className={`grid justify-items-center ${classes}`}>
      <p className="text-sm mb-2">{val}</p>
      <Copier
        text={val}
        classes={{
          container:
            "flex items-center gap-2 px-2 py-1.5 rounded-md border border-gray-l3 shadow-md shadow-black/5",
          icon: "size-5",
        }}
      >
        <span className="capitalize text-sm">Copy Memo</span>
      </Copier>
    </div>
  );
}
