import { useContext } from "react";
import PageError from "../PageError";
import { ProfileContext } from "../ProfileProvider";
import Banner from "./Banner";
import Body from "./Body";
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
      <section className="hidden sm:flex flex-col items-center isolate relative w-full h-full">
        <Banner />
        <Body />

        <div className="absolute left-auto lg:left-20 top-52">
          <Logo />
        </div>
      </section>
    </LocalContext.Provider>
  );
}
