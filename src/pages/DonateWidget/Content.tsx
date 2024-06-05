import ExtLink from "components/ExtLink";
import Seo from "components/Seo";
import { type DonationRecipient, Steps } from "components/donation";
import { APP_NAME, BASE_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import { PRIVACY_POLICY, TERMS_OF_USE_DONOR } from "constants/urls";
import type { EndowmentProfile } from "types/aws";
import type { Parsed } from "./parseConfig";

type Props = {
  profile: EndowmentProfile;
  config: Parsed;
  classes?: string;
};

export default function Content({ profile, config, classes = "" }: Props) {
  const recipient: DonationRecipient = {
    id: profile.id,
    name: profile.name,
    hide_bg_tip: profile.hide_bg_tip,
    progDonationsAllowed: profile.progDonationsAllowed,
  };

  return (
    <div
      className={`${classes} max-w-3xl w-full h-full p-6 grid gap-5 content-start justify-items-center`}
    >
      <Seo
        title={`Donate to ${profile.name} - ${APP_NAME}`}
        description={profile.overview?.slice(0, 140)}
        name={profile.name}
        image={profile.logo}
        url={`${BASE_URL}/${appRoutes.donate_widget}/${profile.id}`}
      />
      {config.isTitleShown && (
        <h1 className="text-center w-full z-20 text-lg sm:text-3xl text-pretty">
          {config.title || `Donate to ${profile.name}`}
        </h1>
      )}

      {config.isDescriptionTextShown && (
        <p className="text-xs text-center sm:text-base">
          {config.description ||
            "Check out the many crypto and fiat donation options. Provide your personal details to receive an immediate tax receipt."}
        </p>
      )}

      <Steps
        source="bg-widget"
        mode="live"
        className="w-full md:w-3/4 border border-gray-l4"
        recipient={recipient}
        config={config}
        programId={config.programId}
      />
      <p className="max-md:border-t max-md:border-gray-l3 px-4 mb-5 col-start-1 text-sm leading-normal text-left text-navy-l1 dark:text-navy-l2">
        By making a donation to {APP_NAME}, you agree to our{" "}
        <A href={TERMS_OF_USE_DONOR}>Terms of Service</A>,{" "}
        <A href={PRIVACY_POLICY}>Privacy Policy</A>. 100% of your donation is
        tax-deductible to the extent allowed by US law. Your donation is made to{" "}
        {APP_NAME}, a tax-exempt US 501(c)(3) charity that grants unrestricted
        funds to {profile.name} on your behalf. As a legal matter, {APP_NAME}{" "}
        must provide any donations to {profile.name} on an unrestricted basis,
        regardless of any designations or restrictions made by you.{" "}
        <A href={TERMS_OF_USE_DONOR}>See Terms.</A>
      </p>
    </div>
  );
}

const A: typeof ExtLink = ({ className, ...props }) => {
  return (
    <ExtLink
      {...props}
      className={className + " font-medium hover:underline"}
    />
  );
};
