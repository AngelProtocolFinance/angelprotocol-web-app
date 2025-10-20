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

import { metas } from "helpers/seo";
import { CheckCircle2Icon, ChevronDownIcon, StarIcon } from "lucide-react";
import { useRef } from "react";
import { Link, NavLink, href } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import { PublicMsgForm } from "./public-msg-form";
import { ShareBtn, socials } from "./share";
import { TributeForm } from "./tribute-form";

export { loader, action } from "./api";
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
  const confetti_fired = useRef(false);

  return (
    <div className="grid content-start justify-items-center max-w-[35rem] mx-auto px-4 py-8 scroll-mt-6">
      <div
        className="mb-6 justify-self-center"
        ref={async (node) => {
          if (!node || confetti_fired.current) return;
          confetti_fired.current = true;
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
          <CheckCircle2Icon
            className={
              data.public_msg ? "stroke-green" : "stroke-gray-l1 fill-gray-l4"
            }
            size={16}
          />
          <span className="text-sm font-semibold">
            Share a message in{" "}
            <NavLink to={data.profile_url} className="text-blue-d1">
              {data.to_name}
            </NavLink>
            {data.to_type === "fund"
              ? " fundraiser page"
              : `${data.to_name.toLowerCase().endsWith("s") ? "'" : "'s"} profile.`}
          </span>
          <ChevronDownIcon className="ml-auto size-5  group-data-open:rotate-180 transition-transform ease-in-out" />
        </DisclosureButton>
        <DisclosurePanel className="p-4">
          <PublicMsgForm init={data.public_msg} />
        </DisclosurePanel>
      </Disclosure>

      {data.to_type !== "fund" ? (
        <Disclosure
          as="div"
          className="w-full border border-gray-l3 divide-y divide-gray-l3 rounded-lg overflow-hidden mt-2"
        >
          <DisclosureButton className="group flex w-full items-center gap-x-2 p-4">
            <CheckCircle2Icon
              className={
                data.private_msg_to_npo
                  ? "stroke-green"
                  : "stroke-gray-l1 fill-gray-l4"
              }
              size={16}
            />
            <span className="text-sm font-semibold">
              Send a private message to{" "}
              <NavLink to={data.profile_url} className="text-blue-d1">
                {data.to_name}
              </NavLink>
            </span>
            <ChevronDownIcon className="ml-auto size-5  group-data-open:rotate-180 transition-transform ease-in-out" />
          </DisclosureButton>
          <DisclosurePanel className="p-4">
            <PublicMsgForm init={data.private_msg_to_npo} />
          </DisclosurePanel>
        </Disclosure>
      ) : null}

      <Disclosure
        as="div"
        className="w-full border border-gray-l3 divide-y divide-gray-l3 rounded-lg overflow-hidden mt-2"
      >
        <DisclosureButton className="group flex w-full items-center gap-x-2 p-4">
          <CheckCircle2Icon
            className={
              data.tribute ? "stroke-green" : "stroke-gray-l1 fill-gray-l4"
            }
            size={16}
          />
          <span className="text-sm font-semibold">Dedicate your donation</span>
          <ChevronDownIcon className="ml-auto size-5  group-data-open:rotate-180 transition-transform ease-in-out" />
        </DisclosureButton>
        <DisclosurePanel className="p-4">
          <TributeForm init={data.tribute} />
        </DisclosurePanel>
      </Disclosure>
      <Disclosure
        as="div"
        defaultOpen
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
