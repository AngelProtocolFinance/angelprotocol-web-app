import chains from "@better-giving/assets/chains";
import type { DonationIntent } from "@better-giving/donation/intent";
import { useNavigate } from "@remix-run/react";
import { apes } from "api/api";
import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { appRoutes } from "constants/routes";
import { roundToCents } from "helpers";
import useSWR from "swr/immutable";
import type { Crypto } from "types/aws";
import { toDonor } from "../../common/constants";
import ContinueBtn from "../../common/continue-btn";
import type { CryptoSubmitStep } from "../../types";
import { PayQr } from "./PayQr";

type Props = {
  classes?: string;
  donation: CryptoSubmitStep;
};

const fetcher = async (intent: DonationIntent) => {
  return apes
    .post<Crypto.NewPayment>("crypto-intents", { json: intent })
    .json();
};

export default function DirectMode({ donation, classes = "" }: Props) {
  const navigate = useNavigate();

  const {
    details,
    init,
    tip,
    donor: fvDonor,
    feeAllowance,
    honorary,
  } = donation;

  const intent: DonationIntent = {
    frequency: "one-time",
    amount: {
      amount: +details.token.amount,
      currency: details.token.code,
      tip: tip?.value ?? 0,
      feeAllowance,
    },
    viaId: details.token.network,
    viaName: chains[details.token.network].name,
    recipient: init.recipient.id,
    source: init.source,
    donor: toDonor(fvDonor),
  };
  if (honorary.honoraryFullName) {
    intent.tribute = {
      fullName: honorary.honoraryFullName,
    };
    if (honorary.withTributeNotif) {
      intent.tribute.notif = honorary.tributeNotif;
    }
  }

  if (details.program.value) {
    intent.program = {
      id: details.program.value,
      name: details.program.label,
    };
  }

  const { data, isLoading, error, isValidating } = useSWR(intent, fetcher);

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
        {details.token.symbol} from your crypto wallet to the address below
      </p>
      <QueryLoader
        queryState={{
          isLoading: isLoading,
          isFetching: isValidating,
          data: data,
          isError: !!error,
        }}
        messages={{
          loading: <ContentLoader className="size-48 rounded-sm" />,
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
        disabled={!!error || isLoading}
        onClick={() =>
          navigate(
            `${appRoutes.donate_thanks}?recipient_name=${init.recipient.name}`
          )
        }
        text="I have completed the payment"
        className="justify-self-stretch mt-8"
      />
    </div>
  );
}
