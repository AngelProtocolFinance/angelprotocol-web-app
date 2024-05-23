import Copier from "components/Copier";
import { chainIdWallets } from "constants/ap-wallets";
import { appRoutes } from "constants/routes";
import type { DonateThanksState } from "pages/DonateThanks";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import type { ChainID } from "types/chain";
import type { TokenWithAmount } from "types/tx";
import { useDonationState } from "../../Context";
import ContinueBtn from "../../common/ContinueBtn";

type Props = {
  classes?: string;
  token: TokenWithAmount;
  chainId: ChainID;
};
export default function DirectMode({ token, chainId, classes = "" }: Props) {
  const { state } = useDonationState();
  const navigate = useNavigate();
  const recipient = chainIdWallets[chainId];
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
        onClick={() =>
          navigate(appRoutes.donate_thanks, {
            state: {
              recipientName: state.init.recipient.name,
              recipientId: state.init.recipient.id,
            } satisfies DonateThanksState,
          })
        }
        text="I have completed the payment"
        className="justify-self-stretch mt-8"
      />
    </div>
  );
}
