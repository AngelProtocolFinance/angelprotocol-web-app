import Seo from "components/Seo";
import { ErrorStatus } from "components/Status";
import { Steps } from "components/donation";
import { APP_NAME, DAPP_URL } from "constants/env";
import { useEffect } from "react";
import { DonationRecipient, setRecipient } from "slices/donation";
import { useSetter } from "store/accessors";
import { EndowmentProfile } from "types/aws";
import { configIsFallback } from "types/widget";
import donaterConfigFn from "./donaterConfig";

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

  const donaterConfig = donaterConfigFn(searchParams);

  return (
    <div
      className={
        classes +
        " max-w-3xl w-full h-full p-6 grid content-start justify-items-center"
      }
    >
      <Seo
        title={`Donate to ${profile.name} - ${APP_NAME}`}
        description={profile.overview.slice(0, 140)}
        name={profile.name}
        image={`${profile.logo}`}
        url={`${DAPP_URL}/donate_widget/${profile.id}`}
      />
      <h1 className="flex justify-center items-center gap-10 w-full h-24 z-20 text-lg sm:text-3xl">
        Donate to {profile.name}
      </h1>
      {configIsFallback(donaterConfig) && (
        <ErrorStatus classes="mb-4">
          Invalid widget config found - loaded defaults
        </ErrorStatus>
      )}
      {donaterConfig.isDescriptionTextShown && (
        <>
          <p className="font-body text-xs text-center sm:text-base mb-3">
            Donate today to {profile.name}. Your donation will be protected and
            compounded in perpetuity to provide {profile.name} with a long-term,
            sustainable runway. Give once, give forever!
          </p>
          <p className="font-body text-xs text-center sm:text-base">
            Make sure to check out the many crypto and fiat donation options.
            You will be given the chance to provide your personal details to
            receive an immediate tax receipt.
          </p>
        </>
      )}

      <Steps
        className="mt-5 w-full md:w-3/4 border border-prim"
        donaterConfig={donaterConfig}
      />
    </div>
  );
}
