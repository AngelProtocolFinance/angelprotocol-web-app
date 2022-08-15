import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProfileParams } from "./types";
import { Profile as IProfile } from "types/server/contracts";
import { useEndowmentProfileQuery } from "services/juno/account";
import { queryObject } from "services/juno/queryContract/queryObjects";
import ContentLoader from "components/ContentLoader";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import Content from "./Content";
import Header from "./Header";
import Nav from "./Nav";
import Stats from "./Stats";

type ProfileWithAddr = IProfile & { address: string };
const context = createContext<ProfileWithAddr>({} as ProfileWithAddr);
export const useProfile = () => {
  const val = useContext(context);
  if (Object.entries(val).length <= 0)
    throw new Error("this hook can only be used inside profile");
  return val;
};

export default function Profile() {
  const { address } = useParams<ProfileParams>();
  const {
    data: profile,
    isLoading,
    isError,
  } = useEndowmentProfileQuery(
    { address: address!, msg: queryObject.accProfile },
    { skip: !address }
  );

  if (isLoading) return <Skeleton />;
  if (isError || !profile) return <PageError />;

  return (
    <section className="padded-container grid grid-cols-1 lg:grid-cols-[2fr_5fr] grid-rows-aa1 gap-4 pb-16 content-start">
      <context.Provider value={{ ...profile, address: address! }}>
        <Nav />
        <Header {...profile} />
        <Content {...profile} classes="row-span-2" />
        <Stats {...profile} classes="hidden lg:block mt-4" />
      </context.Provider>
    </section>
  );
}

function Skeleton() {
  return (
    <section className="padded-container grid grid-cols-1 lg:grid-cols-[2fr_5fr] grid-rows-aa1 gap-4 pb-16 content-start opacity-20">
      <ContentLoader className="w-48 h-10 lg:col-span-2" />
      <ContentLoader className="w-full rounded-md" />
      <div className="w-full row-span-2 grid grid grid-rows-aa1">
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
    <section className="padded-container grid content-center place-items-center gap-2">
      <Icon type="Warning" size={30} className="text-red-400" />
      <p className="text-red-400 text-lg">Failed to load charity profile</p>
      <Link
        to={`${appRoutes.marketplace}`}
        className="text-white/80 hover:text-angel-blue text-sm"
      >
        back to Marketplace
      </Link>
    </section>
  );
}
