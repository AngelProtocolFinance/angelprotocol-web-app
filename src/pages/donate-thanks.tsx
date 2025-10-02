import char from "assets/images/celebrating-character.webp";
import laira_gift from "assets/laira/laira-gift.webp";
import { Share, donation_recipient, is_fund } from "components/donation";
import { ExtLink } from "components/ext-link";
import { Image } from "components/image";
import { BASE_URL } from "constants/env";
import { app_routes } from "constants/routes";
import { confetti } from "helpers/confetti";
import { search } from "helpers/https";
import { metas } from "helpers/seo";
import {
  Link,
  type LoaderFunctionArgs,
  NavLink,
  useOutletContext,
} from "react-router";
import { partial, safeParse } from "valibot";
import type { Route } from "./+types/donate-thanks";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const recipient = safeParse(partial(donation_recipient), search(request));
  if (recipient.issues) return null;
  return recipient.output;
};

export const meta: Route.MetaFunction = ({ loaderData: d }) => {
  const donate_url =
    d && d.id
      ? is_fund(d.id)
        ? `${BASE_URL}${app_routes.funds}/${d.id}/donate`
        : `${BASE_URL}${app_routes.donate}/${d.id}`
      : undefined;

  return metas({
    title: `Donation to ${d?.name ?? "a Nonprofit"}`,
    image: laira_gift,
    description: `I just donated to ${d?.name ?? "a nonprofit"} on Better Giving! ${d && d.id && is_fund(d.id) ? "My gift to this fundraiser helps raise funds for causes they love. Why don't you donate as well?" : "They can choose to use my gift today, or save and invest it for sustainable growth"}. When you give today, you give forever.`,
    url: donate_url,
  });
};

export default function Page({ loaderData: recipient }: Route.ComponentProps) {
  const widgetVersion = useOutletContext<true | undefined>();

  return (
    <div className="grid place-self-center max-w-[35rem] px-4 py-8 sm:py-20 scroll-mt-6">
      <div
        className="mb-6 justify-self-center"
        ref={async (node) => {
          if (!node) return;
          await confetti(node);
        }}
      >
        <Image src={char} />
      </div>
      <p className="uppercase mb-2 font-bold text-xs text-blue-d1 text-center">
        Donation Successful
      </p>
      <h3 className="text-xl sm:text-2xl mb-2 text-center leading-relaxed text-balance">
        Your generosity knows no bounds! Thank you for making a difference!
      </h3>
      <p className="text-center text-gray">
        We'll process your donation to{" "}
        <span className="font-bold">
          {recipient?.name ?? "the nonprofit you specified"}
        </span>{" "}
        as soon as the payment has cleared.
        {widgetVersion
          ? ""
          : " You can safely navigate away using the button below."}
      </p>

      <Share
        name={recipient?.name ?? "Better Giving"}
        id={recipient?.id ?? "1"}
        className="mt-6 border border-gray-l3 rounded-xl"
      />

      <p className="text-center text-gray mt-8 mb-2 text-[15px]">
        {widgetVersion ? (
          <ExtLink
            className="text-blue"
            href={`${BASE_URL}${app_routes.user_dashboard}/donations`}
          >
            My Donations
          </ExtLink>
        ) : (
          <NavLink
            to={`${app_routes.user_dashboard}/donations`}
            className="text-blue [&:is(.pending)]:text-gray"
          >
            My Donations page
          </NavLink>
        )}{" "}
      </p>

      {!widgetVersion && (
        <Link
          to={app_routes.marketplace}
          className="btn btn-outline h-[3.25rem]  max-w-96 w-full justify-self-center normal-case mt-4 rounded-full"
        >
          Back to the platform
        </Link>
      )}
    </div>
  );
}
