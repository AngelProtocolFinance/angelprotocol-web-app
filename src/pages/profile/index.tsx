import fallback_banner from "assets/images/bg-banner.webp";
import flying_character from "assets/images/flying-character.webp";
import { Image } from "components/image";
import { richtext_styles } from "components/rich-text";
import { APP_NAME, BASE_URL } from "constants/env";
import { metas } from "helpers/seo";
import { Outlet } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import { Body } from "./body/body";

export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>({});

export const links: Route.LinksFunction = () => [...richtext_styles];
export const meta: Route.MetaFunction = ({ loaderData: d }) => {
  if (!d) return [];
  return metas({
    title: `${d.npo.name} - ${APP_NAME}`,
    description: d.npo.tagline?.slice(0, 140),
    name: d.npo.name,
    image: d.npo.image || flying_character,
    url: `${BASE_URL}/profile/${d.npo.id}`,
  });
};
export { ErrorBoundary } from "components/error";
export default CacheRoute(Page);
function Page({ loaderData: d, params }: Route.ComponentProps) {
  return (
    <section className="grid grid-rows-[auto_auto_1fr] items-center isolate w-full h-full">
      <div
        className="relative w-full h-52 sm:h-72 bg-cover bg-center"
        style={{
          backgroundImage: `url('${d.npo.image || fallback_banner}')`,
        }}
      />
      <div className="xl:container xl:mx-auto px-5 flex justify-center items-center w-full overflow-visible h-0 isolate lg:justify-start">
        <Image
          src={d.npo.logo || flying_character}
          className="h-48 w-48 border border-gray-l3 rounded-full object-cover bg-white"
        />
      </div>

      <Body npo={d.npo} user={d.user} bal={d.bal} program={params.programId}>
        <Outlet context={d} />
      </Body>
    </section>
  );
}
