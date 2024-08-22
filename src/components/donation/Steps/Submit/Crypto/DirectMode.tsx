import chains from "@better-giving/assets/chains.json";
import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { appRoutes } from "constants/routes";
import { roundToCents } from "helpers";
import { useNavigate } from "react-router-dom";
import { useCreateCryptoIntentQuery } from "services/apes";
import type { DonateThanksState } from "types/pages";
import ContinueBtn from "../../common/ContinueBtn";
import { toDonor } from "../../common/constants";
import type { CryptoSubmitStep } from "../../types";
import { PayQr } from "./PayQr";

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
    chainName: chains[details.token.network].name,
    denomination: details.token.code,
    splitLiq: liquidSplitPct,
    endowmentId: init.recipient.id,
    source: init.source,
    donor: toDonor(fvDonor),
    ...(honorary.honoraryFullName && {
      inHonorOf: honorary.honoraryFullName,
      tributeNotif: honorary.withTributeNotif
        ? honorary.tributeNotif
        : undefined,
    }),
    ...(details.program.value && { programId: details.program.value }),
  });

  const totalDisplayAmount = roundToCents(
    +details.token.amount + (tip?.value ?? 0) + feeAllowance,
    details.token.rate,
    details.token.precision
  );

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
          <PayQr
            token={details.token}
            amount={totalDisplayAmount}
            recipient={payment.pay_address}
            extraId={payment.payin_extra_id}
          />
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
