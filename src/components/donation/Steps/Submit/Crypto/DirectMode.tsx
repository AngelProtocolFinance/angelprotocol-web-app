import Copier from "components/Copier";
import { QRCodeSVG } from "qrcode.react";
import type { TokenWithAmount } from "types/tx";
import ContinueBtn from "../../common/ContinueBtn";

type Props = {
  classes?: string;
  token: TokenWithAmount;
};
export default function DirectMode({ token, classes = "" }: Props) {
  const recipientAddr = token.token_id;
  return (
    <div className={`${classes} grid justify-items-center`}>
      <p className="text-navy-l1 text-balance text-center mb-3.5 max-w-sm">
        To complete your donation, send {token.amount}&nbsp;{token.symbol} from
        your crypto wallet to the address below
      </p>
      <QRCodeSVG value={recipientAddr} className="mb-3.5" size={192} />
      <p className="text-sm mb-4">{recipientAddr}</p>
      <Copier
        text={recipientAddr}
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
