import Seo from "components/Seo";
import { Steps } from "components/donation";
import { APP_NAME, DAPP_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import { useEffect } from "react";
import { DonationRecipient, setRecipient } from "slices/donation";
import { useSetter } from "store/accessors";
import { EndowmentProfile } from "types/aws";
import donaterConfigFn from "./donaterConfig";
import { useErrorContext } from "contexts/ErrorContext";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { ErrorStatus } from "components/Status";

type Props = {
  profile: EndowmentProfile;
  searchParams: URLSearchParams;
  classes?: string;
};

export default function Content({
  profile,
  searchParams,
  classes = "",
}: Props) {
  const dispatch = useSetter();

  useEffect(() => {
    const donationRecipient: DonationRecipient = {
      id: profile.id,
      name: profile.name,
      isKYCRequired: profile.kyc_donors_only ?? false,
      isFiscalSponsored: profile.fiscal_sponsored ?? false,
    };
    dispatch(setRecipient(donationRecipient));
  }, [dispatch, profile]);

  const configResult = donaterConfigFn(searchParams);

  return "error" in configResult ? (
    <Err error={configResult.error} />
  ) : (
    <div
      className={`${classes} max-w-3xl w-full h-full p-6 grid content-start justify-items-center`}
    >
      <Seo
        title={`Donate to ${profile.name} - ${APP_NAME}`}
        description={profile.overview.slice(0, 140)}
        name={profile.name}
        image={profile.logo}
        url={`${DAPP_URL}/${appRoutes.donate_widget}/${profile.id}`}
      />
      <h1 className="flex justify-center items-center gap-10 w-full h-24 z-20 text-lg sm:text-3xl">
        Donate to {profile.name}
      </h1>

      {configResult.config.isDescriptionTextShown && (
        <p className="text-xs text-center sm:text-base">
          Check out the many crypto and fiat donation options. Provide your
          personal details to receive an immediate tax receipt.
        </p>
      )}

      <Steps
        className="mt-5 w-full md:w-3/4 border border-prim"
        donaterConfig={configResult.config}
      />
    </div>
  );
}

function Err({ error }: { error: unknown }) {
  const { handleError } = useErrorContext();

  useEffect(() => {
    handleError(error, GENERIC_ERROR_MESSAGE);
  }, [handleError, error]);

  return <ErrorStatus classes="h-full">{GENERIC_ERROR_MESSAGE}</ErrorStatus>;
}
