import char from "assets/images/celebrating-character.webp";
import laira_gift from "assets/laira/laira-gift.webp";
import { Share } from "components/donation";
import { ExtLink } from "components/ext-link";
import { Image } from "components/image";
import { BASE_URL } from "constants/env";
import { confetti } from "helpers/confetti";
import { resp } from "helpers/https";
import { metas } from "helpers/seo";
import { Link, NavLink, href, useOutletContext } from "react-router";
import type { Route } from "./+types/donate-thanks";
import { donation_get } from ".server/utils";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  if (!params.id) return resp.status(400, "missing donatio id");
  const don = await donation_get(params.id);
  if (!don) return resp.status(404, "donation not found");

  const base_url = url.origin;
  const donate_thanks_path = href("/donate-thanks/:id", { id: params.id });
  const donate_path =
    don.to_type === "fund"
      ? href("/donate-fund/:fundId", { fundId: don.to_id })
      : href("/donate/:id", { id: don.to_id });
  const donate_url = `${base_url}${donate_path}`;
  const donate_thanks_url = `${base_url}${donate_thanks_path}`;

  return { ...don, donate_url, donate_thanks_url };
};

export const meta: Route.MetaFunction = ({ loaderData: d }) => {
  return metas({
    title: `Donation to ${d.to_name}`,
    image: laira_gift,
    description: `I just donated to ${d.to_name} on Better Giving! ${d && d.to_type === "fund" ? "My gift to this fundraiser helps raise funds for causes they love. Why don't you donate as well?" : "They can choose to use my gift today, or save and invest it for sustainable growth"}. When you give today, you give forever.`,
    url: d.donate_url,
  });
};

export default function Page({ loaderData: data }: Route.ComponentProps) {
  const widget_version = useOutletContext<true | undefined>();

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
        <span className="font-bold">{data.to_name}</span> as soon as the payment
        has cleared.
        {widget_version
          ? ""
          : " You can safely navigate away using the button below."}
      </p>

      <Share
        recipient={{
          id: data.to_id,
          name: data.to_name,
        }}
        donate_thanks_url={data.donate_thanks_url}
        donate_url={data.donate_url}
        classes="mt-6 border border-gray-l3 rounded-xl"
      />

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
