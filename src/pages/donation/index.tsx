import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import char from "assets/images/celebrating-character.webp";
import laira_gift from "assets/laira/laira-gift.webp";
import { ExtLink } from "components/ext-link";
import { Image } from "components/image";
import { BASE_URL } from "constants/env";
import { confetti } from "helpers/confetti";
import { resp } from "helpers/https";
import { metas } from "helpers/seo";
import { CheckIcon, ChevronDownIcon, StarIcon } from "lucide-react";
import { useRef } from "react";
import { Link, NavLink, href } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import { ShareBtn, socials } from "./share";
import { TributeForm } from "./tribute-form";
import { donation_get } from ".server/utils";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  if (!params.id) throw resp.status(400, "missing donation id");
  const don = await donation_get(params.id);
  if (!don) throw resp.status(404, "donation not found");

  const base_url = url.origin;
  const donate_thanks_path = href("/donations/:id", { id: params.id });
  const donate_path =
    don.to_type === "fund"
      ? href("/donate-fund/:fundId", { fundId: don.to_id })
      : href("/donate/:id", { id: don.to_id });
  const donate_url = `${base_url}${donate_path}`;
  const donate_thanks_url = `${base_url}${donate_thanks_path}`;

  return { ...don, donate_url, donate_thanks_url };
};

export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export const meta: Route.MetaFunction = ({ loaderData: d }) => {
  if (!d) return [];
  return metas({
    title: `Donation to ${d.to_name}`,
    image: laira_gift,
    description: `I just donated to ${d.to_name} on Better Giving! ${d && d.to_type === "fund" ? "My gift to this fundraiser helps raise funds for causes they love. Why don't you donate as well?" : "They can choose to use my gift today, or save and invest it for sustainable growth"}. When you give today, you give forever.`,
    url: d.donate_url,
  });
};

export { ErrorBoundary } from "components/error";
export default CacheRoute(Page);

function Page({ loaderData: data, matches }: Route.ComponentProps) {
  const widget_version = matches.some((m) =>
    m?.pathname.includes("donate-widget")
  );
  const confettiFired = useRef(false);

  return (
    <div className="grid content-start justify-items-center max-w-[35rem] mx-auto px-4 py-8 scroll-mt-6">
      <div
        className="mb-6 justify-self-center"
        ref={async (node) => {
          if (!node || confettiFired.current) return;
          confettiFired.current = true;
          await confetti(node);
        }}
      >
        <Image src={char} width={80} />
      </div>

      <h3 className="text-xl sm:text-2xl mb-2 text-center leading-relaxed text-balance">
        Your generosity knows no bounds! Thank you for making a difference!
      </h3>

      <p className="mb-4 font-bold text-sm mt-8 text-blue-d1 text-center">
        Make your donation even more impactful
      </p>

      <Disclosure
        as="div"
        className="w-full border border-gray-l3 divide-y divide-gray-l3 rounded-lg overflow-hidden"
      >
        <DisclosureButton className="group flex w-full items-center gap-x-2 p-4">
          <CheckIcon className="stroke-green" size={14} />
          <span className="text-sm font-semibold">Dedicate your donation</span>
          <ChevronDownIcon className="ml-auto size-5  group-data-open:rotate-180 transition-transform ease-in-out" />
        </DisclosureButton>
        <DisclosurePanel className="p-4">
          <TributeForm init={data.tribute} />
        </DisclosurePanel>
      </Disclosure>
      <Disclosure
        as="div"
        className="mt-2 w-full border border-gray-l3 divide-y divide-gray-l3 rounded-lg overflow-hidden"
      >
        <DisclosureButton className="group flex w-full items-center gap-x-2 p-4">
          <StarIcon className="stroke-amber fill-amber" size={14} />
          <span className="text-sm font-semibold">Spread the word!</span>
          <ChevronDownIcon className="ml-auto size-5  group-data-open:rotate-180 transition-transform ease-in-out" />
        </DisclosureButton>
        <DisclosurePanel className="p-4">
          <p className="text-gray">
            Encourage your friends to join in and contribute, making a
            collective impact through donations.
          </p>
          <div className="flex items-center gap-2 mt-1">
            {socials.map((s) => (
              <ShareBtn
                key={s.id}
                {...s}
                recipient={{
                  id: data.to_id,
                  name: data.to_name,
                }}
                donate_thanks_url={data.donate_thanks_url}
                donate_url={data.donate_url}
              />
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      <p className="text-center text-gray mt-8 mb-2 text-[15px]">
        {widget_version ? (
          <ExtLink
            className="text-blue"
            href={`${BASE_URL}${href("/dashboard/donations")}`}
          >
            My Donations
          </ExtLink>
        ) : (
          <NavLink
            to={href("/dashboard/donations")}
            className="text-blue [&:is(.pending)]:text-gray"
          >
            My Donations page
          </NavLink>
        )}{" "}
      </p>

      {!widget_version && (
        <Link
          to={href("/marketplace")}
          className="btn btn-outline h-[3.25rem]  max-w-96 w-full justify-self-center normal-case mt-4 rounded-full"
        >
          Back to the platform
        </Link>
      )}
    </div>
  );
}
