import { chains } from "@better-giving/assets/tokens";
import { ContentLoader } from "components/content-loader";
import { QueryLoader } from "components/query-loader";
import { PROCESSING_RATES } from "constants/common";
import { ru_vdec } from "helpers/decimal";
import { min_fee_allowance } from "helpers/donation";
import { href, useNavigate, useNavigation } from "react-router";
import use_swr from "swr/immutable";
import type { Payment } from "types/crypto";
import type { DonationIntent } from "types/donation-intent";
import { ContinueBtn } from "../../common/continue-btn";
import { type CryptoDonationDetails, type Init, tip_val } from "../../types";
import { PayQr } from "./pay-qr";

type Props = {
  classes?: string;
  fv: CryptoDonationDetails;
  init: Init;
};

const fetcher = async (intent: DonationIntent) =>
  fetch("/api/donation-intents/crypto", {
    method: "POST",
    body: JSON.stringify(intent),
  }).then<Payment>((res) => res.json());

export function DirectMode({ fv, init, classes = "" }: Props) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const tipv = tip_val(fv.tip_format, fv.tip, +fv.token.amount);
  const mfa = min_fee_allowance(
    tipv + +fv.token.amount,
    PROCESSING_RATES.crypto
  );

  const intent: DonationIntent = {
    frequency: "one-time",
    amount: {
      amount: +fv.token.amount,
      currency: fv.token.code,
      tip: tipv,
      fee_allowance: mfa,
    },
    via_id: fv.token.network,
    via_name: chains[fv.token.network].name,
    recipient: init.recipient.id,
    source: init.source,
    donor: {
      title: "",
      first_name: fv.first_name,
      last_name: fv.last_name,
      email: fv.email,
    },
  };

  if (init.program) intent.program = init.program;

  const { data, isLoading, error, isValidating } = use_swr(intent, fetcher);

  const total_disp_amnt = ru_vdec(
    +fv.token.amount + tipv + mfa,
    fv.token.rate,
    fv.token.precision
  );

  return (
    <div className={`${classes} grid justify-items-center`}>
      <p className="text-gray text-balance text-center mb-3.5 max-w-sm">
        To complete your donation, send {total_disp_amnt}
        &nbsp;
        {fv.token.symbol} from your crypto wallet to the address below
      </p>
      <QueryLoader
        queryState={{
          is_loading: isLoading,
          is_fetching: isValidating,
          data: data,
          is_error: !!error,
        }}
        messages={{
          loading: <ContentLoader className="size-48 rounded-sm" />,
          error: "Failed to load donation address",
        }}
      >
        {(payment) => (
          <PayQr
            token={fv.token}
            recipient={payment.address}
            extraId={payment.extra_address ?? null}
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
        disabled={!!error || isLoading || navigation.state !== "idle"}
        onClick={() => {
          const id = data?.order_id;
          if (!id) throw new Error("No order ID found");
          const to =
            init.source === "bg-widget"
              ? href("/donate-widget/donations/:id", { id })
              : href("/donations/:id", { id });

          navigate(to);
        }}
        text="I have completed the payment"
        className="justify-self-stretch mt-8"
      />
    </div>
  );
}
