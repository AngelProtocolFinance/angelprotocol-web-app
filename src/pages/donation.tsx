import char from "assets/images/celebrating-character.webp";
import laira_gift from "assets/laira/laira-gift.webp";
import { Image } from "components/image";
import { confetti } from "helpers/confetti";
import { resp } from "helpers/https";
import { metas } from "helpers/seo";
import { href } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types/donation";
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

  return (
    <div className="grid content-start justify-items-center max-w-[35rem] mx-auto px-4 py-8 scroll-mt-6">
      <div
        className="mb-6 justify-self-center"
        ref={async (node) => {
          if (!node) return;
          await confetti(node);
        }}
      >
        <Image src={char} width={80} />
      </div>

      <h3 className="text-xl sm:text-2xl mb-2 text-center leading-relaxed text-balance">
        Your generosity knows no bounds! Thank you for making a difference!
      </h3>

      <p className="mb-2 font-bold text-sm mt-16 text-blue-d1 text-center">
        Make your donation even more impactful
      </p>

      {/* <Share
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
      )} */}
    </div>
  );
}
