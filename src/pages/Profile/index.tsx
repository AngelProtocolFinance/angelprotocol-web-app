import { useParams } from "react-router-dom";
import placeholderBanner from "assets/images/placeholder-banner.png";
import { useProfileQuery } from "services/aws/aws";
import ProfileContext, { useProfileContext } from "contexts/ProfileContext";
import { idParamToNum } from "helpers";
import Body from "./Body";
import Logo from "./Logo";
import PageError from "./PageError";
import Skeleton from "./Skeleton";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const numId = idParamToNum(id);
  const { isLoading, isError, data } = useProfileQuery(numId, {
    skip: numId === 0,
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError || !data) {
    return <PageError />;
  }

  return (
    <ProfileContext.Provider value={data}>
      <section className="grid grid-rows-[auto_auto_1fr] items-center isolate w-full h-full">
        <Banner />
        <Logo />
        <Body />
      </section>
    </ProfileContext.Provider>
  );
}

function Banner() {
  const { image } = useProfileContext();
  return (
    <div
      className="relative overlay w-full h-52 sm:h-72 bg-cover bg-center"
      style={{ backgroundImage: `url('${image || placeholderBanner}')` }}
    />
  );
}
