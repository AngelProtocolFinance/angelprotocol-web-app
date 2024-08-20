import ContentLoader from "components/ContentLoader";
import Copier from "components/Copier";
import QueryLoader from "components/QueryLoader";
import { logoUrl } from "constants/common";
import { appRoutes } from "constants/routes";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { useCreateCryptoIntentQuery } from "services/apes";
import type { DonateThanksState } from "types/pages";
import ContinueBtn from "../../common/ContinueBtn";
import { toDonor } from "../../common/constants";
import type { CryptoSubmitStep } from "../../types";

type Props = {
  classes?: string;
  donation: CryptoSubmitStep;
};
export default function DirectMode({ donation, classes = "" }: Props) {
  const navigate = useNavigate();

  const {
    details,
    init,
    tip,
    liquidSplitPct,
    donor: fvDonor,
    feeAllowance,
    honorary,
  } = donation;

  const intentQuery = useCreateCryptoIntentQuery({
    transactionId: init.intentId,
    amount: +details.token.amount,
    tipAmount: tip?.value ?? 0,
    feeAllowance,
    chainId: details.token.network,
    chainName: "TODO:remove",
    denomination: details.token.code,
    splitLiq: liquidSplitPct,
    endowmentId: init.recipient.id,
    source: init.config ? "bg-widget" : "bg-marketplace",
    donor: toDonor(fvDonor),
    ...(honorary.honoraryFullName && {
      inHonorOf: honorary.honoraryFullName,
      tributeNotif: honorary.withTributeNotif
        ? honorary.tributeNotif
        : undefined,
    }),
    ...(details.program.value && { programId: details.program.value }),
  });

  const totalDisplayAmount =
    +details.token.amount + (tip?.value ?? 0) + feeAllowance;

  return (
    <div className={`${classes} grid justify-items-center`}>
      <p className="text-navy-l1 text-balance text-center mb-3.5 max-w-sm">
        To complete your donation, send {totalDisplayAmount}
        &nbsp;
        {details.token.code} from your crypto wallet to the address below
      </p>
      <QueryLoader
        queryState={intentQuery}
        messages={{
          loading: <ContentLoader className="size-48 rounded" />,
          error: "Failed to load donation address",
        }}
      >
        {(payment) => (
          <>
            <QRCodeSVG
              imageSettings={{
                src: logoUrl(details.token.logo),
                height: 20,
                width: 20,
                excavate: true,
              }}
              value={payment.pay_address}
              className="mb-3.5"
              size={192}
            />
            <p className="text-sm mb-4">{payment.pay_address}</p>
            <Copier
              text={payment.pay_address}
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

      <p className="text-sm text-gray mt-4 indent-4 leading-normal">
        Please note that manual donations of cryptocurrencies using the QR code
        may take up to 1 business day to process. Due to market fluctuations,
        the value of your cryptocurrency donation may vary between the time it
        is sent and the time it is received. Donors are responsible for ensuring
        they send the correct token and amount pledged, as incorrect submissions
        may result in processing errors and/or a permanent loss of funds. Better
        Giving takes no responsibility for any variance in value of the donation
        made during the processing period, or any loss of funds caused by donor
        error when the donation is made.
      </p>

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
