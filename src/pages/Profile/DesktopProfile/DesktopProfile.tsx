import { useContext } from "react";
import PageError from "../PageError";
import { ProfileContext } from "../ProfileProvider";
import Body from "./Body";
import { useLocalContext } from "./LocalContext";
import LocalContext from "./LocalContext";
import Logo from "./Logo";
import Skeleton from "./Skeleton";

export default function DesktopProfile() {
  const { isLoading, isError, profile } = useContext(ProfileContext);

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError || !profile) {
    return <PageError />;
  }

  return (
    <LocalContext.Provider value={{ profile }}>
      <section className="hidden sm:block isolate relative w-full h-full">
        <div className="absolute left-20 top-52">
          <Logo />
        </div>

        <div className="flex flex-col items-center w-full h-full">
          <Banner />
          <Body />
        </div>
      </section>
    </LocalContext.Provider>
  );
}

function Banner() {
  const { profile } = useLocalContext();
  return (
    <div className="relative w-full h-72">
      <img
        src={profile.image}
        alt=""
        className="absolute h-full w-full object-cover object-right opacity-10"
      />
      <div className="absolute -z-10 bg-blue dark:bg-blue-d4 h-full w-full" />
    </div>
  );
}
