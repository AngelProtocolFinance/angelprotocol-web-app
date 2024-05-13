import Copier from "components/Copier";
import { QRCodeSVG } from "qrcode.react";
import type { TokenOption } from "types/tx";
import ContinueBtn from "../../common/ContinueBtn";

type Props = {
  classes?: string;
  token: TokenOption;
};
export default function DirectMode({ token, classes = "" }: Props) {
  const recipient = token.directReceiverAddr;
  if (!recipient) throw "@dev: should be set";

  return (
    <div className={`${classes} grid justify-items-center`}>
      <p className="text-navy-l1 text-balance text-center mb-3.5 max-w-sm">
        To complete your donation, send {token.amount}&nbsp;{token.symbol} from
        your crypto wallet to the address below
      </p>
      <QRCodeSVG value={recipient} className="mb-3.5" size={192} />
      <p className="text-sm mb-4">{recipient}</p>
      <Copier
        text={recipient}
        classes={{
          container:
            "flex items-center gap-2 px-2 py-1.5 rounded-md border border-gray-l4 shadow-md shadow-black/5",
          icon: "size-5",
        }}
      >
        <span className="capitalize text-sm">Copy address</span>
      </Copier>
      <ContinueBtn
        text="I have completed the payment"
        className="justify-self-stretch mt-8"
      />
    </div>
  );
}
