import { useContext } from "react";
import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import { ProfileContext } from "../ProfileProvider";
import Body from "./Body";
import LocalContext, { useLocalContext } from "./LocalContext";
import Logo from "./Logo";
import Skeleton from "./Skeleton";

export default function DesktopProfile() {
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
      <section className="hidden sm:flex flex-col items-center isolate relative w-full h-full">
        <Banner />
        <Body />

        <Logo className="absolute left-20 top-52 z-10" />
      </section>
    </LocalContext.Provider>
  );
}

function Banner() {
  const { image } = useLocalContext();
  return (
    <div className="relative w-full h-72">
      <img
        src={image}
        alt=""
        className="absolute h-full w-full object-cover object-right opacity-10"
      />
      <div className="absolute -z-10 bg-blue dark:bg-blue-d3 h-full w-full" />
    </div>
  );
}

function PageError() {
  return (
    <section className="padded-container flex flex-col items-center justify-center w-full h-screen gap-2 text-red-l1 dark:text-red-l2">
      <Icon type="Warning" size={30} />
      <p className="text-lg">Failed to load endowment profile</p>
      <Link
        to={`${appRoutes.index}`}
        className="text-blue-l5 hover:text-blue text-sm"
      >
        back to Marketplace
      </Link>
    </section>
  );
}
