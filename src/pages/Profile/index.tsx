import { Link } from "react-router-dom";
import ContentLoader from "components/ContentLoader";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import Body from "./Body";
import Header from "./Header";
import ProfileProvider, { useProfileContext } from "./ProfileProvider";

export default function Profile() {
  return (
    <ProfileProvider>
      <Content />
    </ProfileProvider>
  );
}

function Content() {
  const { isLoading, isError, profile, kyc_donors_only } = useProfileContext();

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError || !profile || kyc_donors_only === undefined) {
    return <PageError />;
  }

  return (
    <section className="padded-container">
      <Header />
      <Body />
    </section>
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
    <section className="padded-container grid content-center place-items-center gap-2">
      <Icon type="Warning" size={30} className="text-red-l1" />
      <p className="text-red-l1 text-lg">Failed to load endowment profile</p>
      <Link
        to={`${appRoutes.index}`}
        className="text-blue-l4 hover:text-blue text-sm"
      >
        back to Marketplace
      </Link>
    </section>
  );
}
