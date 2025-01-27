import { Link } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import type { DonateData } from "api/donate-loader";
import flying_character from "assets/images/flying-character.webp";
import { Steps } from "components/donation";
import ExtLink from "components/ext-link";
import { DappLogo } from "components/image";
import { INTERCOM_HELP } from "constants/env";
import { appRoutes } from "constants/routes";
import { PRIVACY_POLICY } from "constants/urls";
import FAQ from "./FAQ";
import OrgCard from "./OrgCard";

export default function Content() {
  const { endow } = useCachedLoaderData<DonateData>();
  return (
    <div className="w-full bg-[#F6F7F8]">
      <div className="bg-white h-[3.6875rem] w-full flex items-center justify-between px-10 mb-4">
        <DappLogo classes="h-12" />
        <Link
          to={`${appRoutes.marketplace}/${endow.id}`}
          className="font-semibold font-heading hover:text-blue-d1"
        >
          Cancel
        </Link>
      </div>
      <div className="md:px-4 max-w-[68.625rem] mx-auto grid md:grid-cols-[1fr_auto] items-start content-start gap-4">
        <div className="@container/org-card col-start-1 row-start-1">
          <OrgCard
            id={endow.id}
            name={endow.name}
            tagline={endow.tagline}
            logo={endow.logo || flying_character}
            classes=""
            target={endow.target}
          />
        </div>

        {/** small screen but space is still enough to render sidebar */}
        <div className="mx-0 border-b md:contents min-[445px]:border min-[445px]:mx-4 rounded-lg border-gray-l4">
          <Steps
            source="bg-marketplace"
            mode="live"
            recipient={{
              id: endow.id.toString(),
              name: endow.name,
              hide_bg_tip: endow.hide_bg_tip,
              progDonationsAllowed: endow.progDonationsAllowed,
            }}
            config={{
              methodIds: endow.donateMethods,
              increments: endow.increments?.map((i) => ({
                ...i,
                value: +i.value,
              })),
            }}
            className="md:border border-gray-l4 rounded-lg row-start-2"
          />
        </div>
        <FAQ classes="max-md:px-4 md:col-start-2 md:row-span-5 md:w-[18.875rem]" />
        <p className="max-md:px-4 mb-4 max-mbcol-start-1 text-sm leading-normal text-left text-navy-l1 dark:text-navy-l2">
          <span className="block mb-0.5">
            Need help? See{" "}
            <Link to="./#faqs" className="hover:underline font-medium">
              FAQs
            </Link>{" "}
            or contact us at our <A href={INTERCOM_HELP}>Help Center</A>.
          </span>
          <span className="block mb-0.5">
            Have ideas for how we can build a better donation experience?{" "}
            <A href={INTERCOM_HELP}>Send us feedback</A>.
          </span>
          <span className="block">
            We respect your privacy. To learn more, check out our{" "}
            <A href={PRIVACY_POLICY}>Privacy Policy</A>.
          </span>
        </p>
      </div>
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
