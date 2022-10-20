import { useContext } from "react";
import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import LocalContext, { useLocalContext } from "../LocalContext";
import Logo from "../Logo";
import PageError from "../PageError";
import { ProfileContext } from "../ProfileProvider";
import Body from "./Body";
import Skeleton from "./Skeleton";

export default function MobileProfile() {
  const { isLoading, isError, profile, kyc_donors_only, id } =
    useContext(ProfileContext);

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError || !profile || kyc_donors_only === undefined) {
    return <PageError />;
  }

  return (
    <LocalContext.Provider value={{ ...profile, kyc_donors_only, id }}>
      <section className="sm:hidden isolate relative w-full h-full">
        <Logo className="absolute left-auto top-24 z-10" />

        <div className="flex flex-col items-center w-full h-full">
          <Banner />
          <Body />
        </div>
      </section>
    </LocalContext.Provider>
  );
}

function Banner() {
  const { image } = useLocalContext();
  return (
    <div className="relative w-full h-60">
      <img
        src={image}
        alt=""
        className="absolute h-full w-full object-cover object-right opacity-10"
      />
      <div className="absolute -z-10 bg-blue dark:bg-blue-d4 h-full w-full" />
    </div>
  );
}
