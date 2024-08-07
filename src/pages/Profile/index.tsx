import fallback_banner from "assets/images/fallback-banner.png";
import flying_character from "assets/images/flying-character.png";
import Image from "components/Image";
import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import {
  Navigate,
  Outlet,
  type RouteObject,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { segment } from "schemas/string";
import { useEndowment } from "services/aws/useEndowment";
import { bodyRoute } from "./Body";
import PageError from "./PageError";
import ProfileContext, { useProfileContext } from "./ProfileContext";
import Skeleton from "./Skeleton";

function Profile() {
  const legacy = useOutletContext<true | undefined>();
  const { id = "" } = useParams<{ id: string }>();

  const { isLoading, isError, data } = useEndowment(
    segment.isValidSync(id) ? { slug: id } : { id: Number(id) }
  );

  if (isLoading) return <Skeleton />;
  if (isError || !data) return <PageError />;

  if (legacy) {
    if (data.id === null) {
      return <Navigate to={appRoutes.marketplace} />;
    }

    if (data.id !== Number(id)) {
      return <Navigate to={`${appRoutes.marketplace}/${data.id}`} />;
    }
  }

  // if (!data.published) return <Unpublished />;

  return (
    <ProfileContext.Provider value={data}>
      <Seo
        title={`${data.name} - ${APP_NAME}`}
        description={data?.overview?.slice(0, 140)}
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

export const profileRoute: RouteObject = {
  element: <Profile />,
  children: [bodyRoute],
};
