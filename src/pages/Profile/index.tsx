import { useParams } from "react-router-dom";
import {
  useEndowmentDetailsQuery,
  useEndowmentProfileQuery,
} from "services/juno/account";
import { idParamToNum } from "helpers";
import Logo from "./Logo";
import MainContent from "./MainContent";
import PageError from "./PageError";
import ProfileContext, { useProfileContext } from "./ProfileContext";
import Skeleton from "./Skeleton";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const numId = idParamToNum(id);
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useEndowmentProfileQuery({ id: numId }, { skip: numId === 0 });

  const {
    data: endowment,
    isLoading: isEndowLoading,
    isError: isEndowError,
  } = useEndowmentDetailsQuery({ id: numId }, { skip: numId === 0 });

  if (isEndowLoading || isProfileLoading) {
    return <Skeleton />;
  }

  if (isEndowError || isProfileError || !profile || !endowment) {
    return <PageError />;
  }

  return (
    <ProfileContext.Provider
      value={{
        ...profile,
        kyc_donors_only: endowment.kyc_donors_only,
        id: numId,
      }}
    >
      <section className="grid grid-rows-[auto_auto_1fr] items-center isolate w-full h-full">
        <Banner />
        <Logo />
        <MainContent />
      </section>
    </ProfileContext.Provider>
  );
}

function Banner() {
  const { image } = useProfileContext();
  return (
    <div className="relative w-full h-52 sm:h-72">
      <img
        src={image}
        alt=""
        className="absolute h-full w-full object-cover object-right opacity-10"
      />
      <div className="absolute -z-10 bg-blue dark:bg-blue-d3 h-full w-full" />
    </div>
  );
}
