import type { Endow } from "@better-giving/endowment";
import { useLoaderData } from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import type { MetaFunction } from "@vercel/remix";
import fallback_banner from "assets/images/bg-banner.webp";
import flying_character from "assets/images/flying-character.webp";
import Image from "components/image";
import { APP_NAME, BASE_URL } from "constants/env";
import { metas } from "helpers/seo";
import ProfileContext from "./profile-context";

export { profileLoader as loader } from "./profile-loader";

export const meta: MetaFunction = ({ data }) => {
  if (!data) return [];
  const d = data as Endow;
  return metas({
    title: `${d.name} - ${APP_NAME}`,
    description: d.tagline?.slice(0, 140),
    name: d.name,
    image: d.image || flying_character,
    url: `${BASE_URL}/profile/${d.id}`,
  });
};
export { ErrorBoundary } from "components/error";
export default function Profile() {
  const data = useLoaderData() as Endow;

  return (
    <ProfileContext.Provider value={data}>
      <section className="grid grid-rows-[auto_auto_1fr] items-center isolate w-full h-full">
        <div
          className="relative w-full h-52 sm:h-72 bg-cover bg-center"
          style={{
            backgroundImage: `url('${data.image || fallback_banner}')`,
          }}
        />
        <div className="xl:container xl:mx-auto px-5 flex justify-center items-center w-full overflow-visible h-0 isolate lg:justify-start">
          <Image
            src={data.logo || flying_character}
            className="h-48 w-48 border border-gray-l3 rounded-full object-cover bg-white"
          />
        </div>
        <Outlet />
      </section>
    </ProfileContext.Provider>
  );
}
