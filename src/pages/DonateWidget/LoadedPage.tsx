import { useEffect } from "react";
import { Profile } from "services/types";
import { configIsFallback } from "types/widget";
import Image from "components/Image";
import Seo from "components/Seo";
import { Info } from "components/Status";
import WalletSuite from "components/WalletSuite";
import { Steps } from "components/donation";
import { useSetter } from "store/accessors";
import { DonationRecipient, setRecipient } from "slices/donation";
import { possesiveForm } from "helpers";
import { LOGO_DARK, PAYMENT_WORDS, titleCase } from "constants/common";
import { APP_NAME, DAPP_URL } from "constants/env";
import { styles } from "./constants";
import donaterConfigFn from "./donaterConfig";

type Props = {
  profile: Profile;
  searchParams: URLSearchParams;
};

export default function LoadedPage({ profile, searchParams }: Props) {
  const dispatch = useSetter();

  useEffect(() => {
    const donationRecipient: DonationRecipient = {
      id: profile.id,
      name: profile.name,
      endowType: profile.type,
      isKYCRequired:
        //prettier-ignore
        (profile.type === "ast" && profile.contributor_verification_required) ||
        (profile.kyc_donors_only ?? false),
      isFiscalSponsored: profile.fiscal_sponsored ?? false,
    };
    dispatch(setRecipient(donationRecipient));
  }, [dispatch, profile]);

  const donaterConfig = donaterConfigFn(searchParams);

  return (
    <div className={styles.page}>
      <Seo
        title={`${titleCase(PAYMENT_WORDS.verb)} to ${
          profile.name
        } - ${APP_NAME}`}
        description={(profile.overview ?? "").slice(0, 140)}
        name={profile.name}
        image={`${profile.logo}`}
        url={`${DAPP_URL}/donate_widget/${profile.id}`}
      />
      <header className="flex justify-center items-center gap-10 w-full h-24 z-20">
        <h1 className="text-lg sm:text-3xl">
          {possesiveForm(profile.name)} endowment
        </h1>
        <WalletSuite />
      </header>
      {configIsFallback(donaterConfig) && (
        <Info>Invalid widget config found - loaded defaults</Info>
      )}
      {donaterConfig.isDescriptionTextShown && (
        <>
          <p className="font-body text-xs sm:text-base -mb-5">
            {titleCase(PAYMENT_WORDS.verb)} today to{" "}
            {possesiveForm(profile.name)} endowment. Your donation will be
            protected and compounded in perpetuity to provide {profile.name}{" "}
            with a long-term, sustainable runway. Give once, give forever!
          </p>
          <p className="font-body text-xs sm:text-base">
            Make sure to check out the many crypto and fiat donation options.
            You will be given the chance to provide your personal details to
            receive an immediate tax receipt.
          </p>
        </>
      )}
      <Steps className="mt-5 w-3/4" donaterConfig={donaterConfig} />
      <footer className="flex justify-center items-center h-20 w-full bg-blue dark:bg-blue-d3">
        <Image className="w-20" {...LOGO_DARK} />
      </footer>
    </div>
  );
}
