import type { Endow } from "@better-giving/endowment";
import { useLoaderData } from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import fallback_banner from "assets/images/fallback-banner.png";
import flying_character from "assets/images/flying-character.png";
import Image from "components/Image";
import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import ProfileContext, { useProfileContext } from "./ProfileContext";

export { profileLoader as clientLoader } from "./profile-loader";
export default function Profile() {
  const data = useLoaderData() as Endow;

  return (
    <ProfileContext.Provider value={data}>
      <Seo
        title={`${data.name} - ${APP_NAME}`}
        description={data?.tagline?.slice(0, 140)}
        name={data.name}
        image={data?.logo || flying_character}
        url={`${BASE_URL}/profile/${data.id}`}
      />
      <section className="grid grid-rows-[auto_auto_1fr] items-center isolate w-full h-full">
        <Banner />
        <Logo />
        <Outlet />
      </section>
    </ProfileContext.Provider>
  );
}

function Banner() {
  const { image } = useProfileContext();
  return (
    <div
      className="relative w-full h-52 sm:h-72 bg-cover bg-center"
      style={{
        backgroundImage: `url('${image || fallback_banner}')`,
      }}
    />
  );
}

function Logo() {
  const { logo } = useProfileContext();
  return (
    <div className="padded-container flex justify-center items-center w-full overflow-visible h-0 isolate lg:justify-start">
      <Image
        src={logo || flying_character}
        className="h-48 w-48 border border-gray-l4 rounded-full object-cover bg-white"
      />
    </div>
  );
}
