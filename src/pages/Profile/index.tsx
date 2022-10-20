import { useParams } from "react-router-dom";
import {
  useEndowmentDetailsQuery,
  useEndowmentProfileQuery,
} from "services/juno/account";
import { idParamToNum } from "helpers";
import Body from "./Body";
import Logo from "./Logo";
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
      <section className="flex flex-col items-center isolate relative w-full h-full">
        <Banner />
        <Body />

        <Logo className="absolute left-auto top-32 z-10 sm:left-20 sm:top-48" />
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
