import ContentLoader from "components/ContentLoader";
import Copier from "components/Copier";
import QueryLoader from "components/QueryLoader";
import { apWallets } from "constants/ap-wallets";
import { chains } from "constants/chains";
import { appRoutes } from "constants/routes";
import type { DonateThanksState } from "pages/DonateThanks";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { useCreateCryptoIntentQuery } from "services/apes";
import ContinueBtn from "../../common/ContinueBtn";
import type { CryptoSubmitStep } from "../../types";

type Props = {
  classes?: string;
  donation: CryptoSubmitStep;
};
export default function DirectMode({ donation, classes = "" }: Props) {
  const navigate = useNavigate();

  const { details, init, tip, liquidSplitPct, donor } = donation;

  const recipient = apWallets[details.chainId.value];

  const intentQuery = useCreateCryptoIntentQuery({
    transactionId: init.intentId,
    amount: +details.token.amount,
    tipAmount: tip?.value ?? 0,
    chainId: chains[details.chainId.value].id,
    chainName: chains[details.chainId.value].name,
    denomination: details.token.symbol,
    splitLiq: liquidSplitPct,
    endowmentId: init.recipient.id,
    source: init.config ? "bg-widget" : "bg-marketplace",
    donor,
  });

  return (
    <div className={`${classes} grid justify-items-center`}>
      <p className="text-navy-l1 text-balance text-center mb-3.5 max-w-sm">
        To complete your donation, send {details.token.amount}&nbsp;
        {details.token.symbol} from your crypto wallet to the address below
      </p>
      <QueryLoader
        queryState={intentQuery}
        messages={{
          loading: <ContentLoader className="size-48 rounded" />,
          error: "Failed to load donation address",
        }}
      >
        {() => (
          <>
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
          </>
        )}
      </QueryLoader>

      <ContinueBtn
        disabled={intentQuery.isError || intentQuery.isLoading}
        onClick={() =>
          navigate(appRoutes.donate_thanks, {
            state: {
              recipientName: init.recipient.name,
              recipientId: init.recipient.id,
            } satisfies DonateThanksState,
          })
        }
        text="I have completed the payment"
        className="justify-self-stretch mt-8"
      />
    </div>
  );
}
