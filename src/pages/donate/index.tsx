import flying_character from "assets/images/flying-character.webp";
import { Steps } from "components/donation";
import { ExtLink } from "components/ext-link";
import { DappLogo } from "components/image";
import { INTERCOM_HELP } from "constants/env";
import { APP_NAME, BASE_URL } from "constants/env";
import { PRIVACY_POLICY } from "constants/urls";
import { metas } from "helpers/seo";
import { Link, href } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import { FAQ } from "./faq";
import { OrgCard } from "./org-card";

export { loader } from "api/donate-loader";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export const meta: Route.MetaFunction = ({ loaderData: d }) => {
  if (!d) return [];
  const { endow } = d;
  return metas({
    title: `Donate to ${endow.name} - ${APP_NAME}`,
    description: endow.tagline?.slice(0, 140),
    name: endow.name,
    image: endow.logo,
    url: `${BASE_URL}/donate/${endow.id}`,
  });
};
export default CacheRoute(Page);
function Page({ loaderData }: Route.ComponentProps) {
  const { endow, balance, program, user } = loaderData;
  return (
    <div className="w-full bg-[#F6F7F8]">
      <div className="bg-white h-[3.6875rem] w-full flex items-center justify-between px-10 mb-4">
        <DappLogo classes="h-12" />
        <Link
          to={href("/marketplace/:id", { id: endow.id.toString() })}
          className="font-semibold  hover:text-blue-d1"
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
            balance={balance}
            program={program}
          />
        </div>

        {/** small screen but space is still enough to render sidebar */}
        <div className="mx-0 border-b md:contents min-[445px]:border min-[445px]:mx-4 rounded-lg border-gray-l3">
          <Steps
            source="bg-marketplace"
            mode="live"
            recipient={{
              id: endow.id.toString(),
              name: endow.name,
              hide_bg_tip: endow.hide_bg_tip,
              members: [],
            }}
            config={{
              method_ids: endow.donateMethods,
              increments: endow.increments,
            }}
            program={
              program ? { id: program.id, name: program.title } : undefined
            }
            user={user}
            className="md:border border-gray-l3 rounded-lg row-start-2"
          />
        </div>
        <FAQ classes="max-md:px-4 md:col-start-2 md:row-span-5 md:w-[18.875rem]" />
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
