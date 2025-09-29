import flying_character from "assets/images/flying-character.webp";
import { Steps } from "components/donation";
import { ExtLink } from "components/ext-link";
import { DappLogo } from "components/image";
import { Info } from "components/status";
import { APP_NAME, INTERCOM_HELP } from "constants/env";
import { app_routes } from "constants/routes";
import { PRIVACY_POLICY } from "constants/urls";
import { metas } from "helpers/seo";
import { Link } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import FAQ from "./faq";
import { FundCard } from "./fund-card";

const is_closed = (active: boolean, expiration?: string): boolean => {
  const isExpired = expiration ? expiration < new Date().toISOString() : false;
  return !active || isExpired;
};

export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export const meta: Route.MetaFunction = ({ loaderData: d }) => {
  return metas({
    title: `Donate to ${d.fund.name} - ${APP_NAME}`,
  });
};

export default CacheRoute(Page);
function Page({ loaderData: { fund } }: Route.ComponentProps) {
  return (
    <div className="w-full bg-[#F6F7F8]">
      <div className="bg-white h-[3.6875rem] w-full flex items-center justify-between px-10 mb-4">
        <DappLogo classes="h-12" />
        <Link
          to={`${app_routes.funds}/${fund.id}`}
          className="font-semibold font-heading hover:text-blue-d1"
        >
          Cancel
        </Link>
      </div>
      <div className="md:px-4 max-w-[68.625rem] mx-auto grid md:grid-cols-[1fr_auto] items-start content-start gap-4">
        <div className="@container/fund-card col-start-1 row-start-1">
          <FundCard
            id={fund.id}
            progress={fund.donation_total_usd}
            name={fund.name}
            tagline={fund.description}
            logo={fund.logo || flying_character}
            classes="col-start-1 row-start-1"
            target={fund.target}
          />
        </div>
        {/** small screen but space is still enough to render sidebar */}
        <div className="mx-0 border-b md:contents min-[445px]:border min-[445px]:mx-4 rounded-lg border-gray-l3">
          {is_closed(fund.active, fund.expiration) ? (
            <Info classes="row-start-2 self-center bg-white rounded-lg h-80 content-center justify-items-center grid">
              This fundraiser is already closed and can't accept any more
              donations
            </Info>
          ) : (
            <Steps
              source="bg-marketplace"
              mode="live"
              recipient={{
                id: fund.id,
                name: fund.name,
                hide_bg_tip: fund.settings.hide_bg_tip,
                members: fund.members.map((x) => x.id.toString()),
                progDonationsAllowed: false,
              }}
              config={{ method_ids: fund.settings.donateMethods }}
              className="md:border border-gray-l3 rounded-lg row-start-2"
            />
          )}
        </div>
        <FAQ
          classes="max-md:px-4 md:col-start-2 md:row-span-5 md:w-[18.875rem]"
          //TODO: endowId={1}
          endowId={1}
        />
        <p className="max-md:px-4 mb-4 max-mbcol-start-1 text-sm leading-normal text-left text-gray dark:text-gray">
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
      className={`${className} font-medium hover:underline`}
    />
  );
};
