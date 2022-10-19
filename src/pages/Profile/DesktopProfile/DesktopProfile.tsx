import { useContext } from "react";
import { Link } from "react-router-dom";
import ContentLoader from "components/ContentLoader";
import Icon from "components/Icon";
import Loader from "components/Loader";
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
        <Banner />
        <Body />

        <div className="absolute left-auto lg:left-20 top-52">
          <Logo />
        </div>
      </section>
    </LocalContext.Provider>
  );
}

function Skeleton() {
  return (
    <section className="hidden sm:flex flex-col items-center isolate relative w-full h-full">
      <div className="flex items-center justify-center h-72 w-full">
        <Loader bgColorClass="bg-white/80" gapClass="gap-2" widthClass="w-4" />
      </div>
      <div className="w-full h-full bg-white dark:bg-blue-d5 flex pt-6 pb-20 px-20">
        <div className="flex flex-col gap-10 w-full h-full">
          <div className="w-full h-52 grid grid-rows-2 gap-4">
            <ContentLoader className="w-2/5 h-full justify-self-end" />
            <ContentLoader className="w-full h-full" />
          </div>
          <div className="flex gap-8 w-full h-full">
            <ContentLoader className="w-full h-[905px]" />
            <ContentLoader className="w-[405px] h-[905px]" />
          </div>
        </div>
      </div>

      <div className="absolute left-auto lg:left-20 top-36">
        <div className="box-border h-44 w-44 rounded-full bg-blue-l3 object-contain dark:bg-blue">
          <Loader
            bgColorClass="bg-white/80"
            gapClass="gap-2"
            widthClass="w-4"
          />
        </div>
      </div>
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
