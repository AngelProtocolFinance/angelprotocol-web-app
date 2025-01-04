import type { Endow } from "@better-giving/endowment";
import { Link } from "@remix-run/react";
import flying_character from "assets/images/flying-character.png";
import ExtLink from "components/ExtLink";
import { DappLogo } from "components/Image";
import { Steps } from "components/donation";
import { INTERCOM_HELP } from "constants/env";
import { appRoutes } from "constants/routes";
import { PRIVACY_POLICY } from "constants/urls";
import { memo } from "react";
import type { DonationIntent } from "types/aws";
import FAQ from "./FAQ";
import OrgCard from "./OrgCard";

type Props = {
  intent: DonationIntent.ToResume | null;
  endowment: Endow;
};

function Content({ intent, endowment }: Props) {
  return (
    <div className="w-full bg-[#F6F7F8]">
      <div className="bg-white h-[3.6875rem] w-full flex items-center justify-between px-10 mb-4">
        <DappLogo classes="h-[2.036rem]" />
        <Link
          to={`${appRoutes.marketplace}/${endowment.id}`}
          className="font-semibold font-heading hover:text-blue-d1"
        >
          Cancel
        </Link>
      </div>
      <div className="md:px-4 max-w-[68.625rem] mx-auto grid md:grid-cols-[1fr_auto] items-start content-start gap-4">
        <div className="@container/org-card col-start-1 row-start-1">
          <OrgCard
            id={endowment.id}
            name={endowment.name}
            tagline={endowment.tagline}
            logo={endowment.logo || flying_character}
            classes=""
            target={endowment.target}
          />
        </div>

        {/** small screen but space is still enough to render sidebar */}
        <div className="mx-0 border-b md:contents min-[445px]:border min-[445px]:mx-4 rounded-lg border-gray-l4">
          <Steps
            source="bg-marketplace"
            mode="live"
            intent={intent ?? undefined}
            recipient={{
              id: endowment.id,
              name: endowment.name,
              hide_bg_tip: endowment.hide_bg_tip,
              progDonationsAllowed: endowment.progDonationsAllowed,
            }}
            config={{
              methodIds: endowment.donateMethods,
              increments: endowment.increments?.map((i) => ({
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

//memoize to prevent useEffect ( based on props ) from running when parent re-renders with the same props
export default memo(Content);

const A: typeof ExtLink = ({ className, ...props }) => {
  return (
    <ExtLink
      {...props}
      className={className + " font-medium hover:underline"}
    />
  );
};
