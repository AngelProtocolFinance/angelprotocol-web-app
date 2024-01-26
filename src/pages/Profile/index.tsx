import Image from "components/Image";
import Seo from "components/Seo";
import { APP_NAME, DAPP_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import { idParamToNum } from "helpers";
import { Navigate, useParams } from "react-router-dom";
import { useEndowment } from "services/aws/useEndowment";
import Body from "./Body";
import PageError from "./PageError";
import ProfileContext, { useProfileContext } from "./ProfileContext";
import Skeleton from "./Skeleton";

export default function Profile({ legacy = false }) {
  const { id } = useParams<{ id: string }>();
  const numId = idParamToNum(id);
  const { isLoading, isError, data } = useEndowment(numId);

  if (isLoading) return <Skeleton />;
  if (isError || !data) return <PageError />;

  if (legacy) {
    if (data.id === null) {
      return <Navigate to={appRoutes.marketplace} />;
    }

    if (data.id !== numId) {
      return <Navigate to={`${appRoutes.marketplace}/${data.id}`} />;
    }
  }

  // if (!data.published) return <Unpublished />;

  return (
    <ProfileContext.Provider value={data}>
      <Seo
        title={`${data.name} - ${APP_NAME}`}
        description={data?.overview.slice(0, 140)}
        name={data.name}
        image={data.logo}
        url={`${DAPP_URL}/profile/${data.id}`}
      />
      <section className="grid grid-rows-[auto_auto_1fr] items-center isolate w-full h-full">
        <Banner />
        <Logo />
        <Body />
      </section>
    </ProfileContext.Provider>
  );
}

function Banner() {
  const { image = "/images/placeholder-banner.png" } = useProfileContext();
  return (
    <div
      className="relative overlay w-full h-52 sm:h-72 bg-cover bg-center"
      style={{
        backgroundImage: `url('${image}')`,
      }}
    />
  );
}

function Logo() {
  const { logo = "" } = useProfileContext();
  return (
    <div className="padded-container flex justify-center items-center w-full overflow-visible h-0 isolate lg:justify-start">
      <Image
        src={logo}
        className="h-48 w-48 border border-prim rounded-full object-cover bg-white"
      />
    </div>
  );
}
