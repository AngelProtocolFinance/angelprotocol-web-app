import fallback_banner from "assets/images/fallback-banner.png";
import flying_character from "assets/images/flying-character.png";
import Image from "components/Image";
import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import { useRendered } from "hooks/use-rendered";
import { Outlet, type RouteObject, useLoaderData } from "react-router-dom";
import type { EndowmentProfile } from "types/aws";
import { bodyRoute } from "./Body";
import ProfileContext, { useProfileContext } from "./ProfileContext";
import { profileLoader } from "./profile-loader";

function Profile() {
  const data = useLoaderData() as EndowmentProfile;

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
  useRendered();
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

export const profileRoute: RouteObject = {
  element: <Profile />,
  loader: profileLoader,
  children: [bodyRoute],
};
