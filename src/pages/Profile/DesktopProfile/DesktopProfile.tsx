import { useContext } from "react";
import { Link } from "react-router-dom";
import ContentLoader from "components/ContentLoader";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import { ProfileContext } from "../ProfileProvider";
import Banner from "./Banner";
import Body from "./Body";
import LocalContext from "./LocalContext";
import Logo from "./Logo";

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
        <Banner className="h-72" />
        <Logo className="absolute left-auto lg:left-20 top-52" />
        <Body />
      </section>
    </LocalContext.Provider>
  );
}

function Skeleton() {
  return (
    <section className="padded-container grid grid-cols-1 lg:grid-cols-[2fr_5fr] grid-rows-[auto_auto_1fr] gap-4 pb-16 pt-28 content-start opacity-20">
      <ContentLoader className="w-48 h-10 lg:col-span-2" />
      <ContentLoader className="w-full rounded-md" />
      <div className="w-full row-span-2 grid grid grid-rows-[auto_auto_1fr]">
        <ContentLoader className="w-full h-[300px] rounded-md" />
        <ContentLoader className="w-full h-10 mt-2 rounded-md" />
        <ContentLoader className="w-full h-full mt-2 rounded-md" />
      </div>
      <ContentLoader className="hidden lg:block mt-2 h-full w-full rounded-md" />
    </section>
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
