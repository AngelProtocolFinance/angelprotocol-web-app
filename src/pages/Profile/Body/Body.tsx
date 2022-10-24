import { useBalanceQuery } from "services/juno/account";
import Icon from "components/Icon";
import { QueryLoader } from "components/admin";
import { useProfileContext } from "../ProfileContext";
import Balances from "./Balances";

export default function Body() {
  const profile = useProfileContext();
  const queryState = useBalanceQuery({ id: profile.id });

  return (
    <div className="flex flex-col gap-8 items-center w-full h-full pt-32 px-6 pb-8 bg-gray-l5 dark:bg-blue-d4 xl:grid xl:grid-rows-[auto_auto_1fr] xl:grid-cols-[auto_auto] xl:items-end xl:gap-10 xl:pt-6 xl:px-20 xl:pb-20">
      <div className="order-2 flex flex-col items-center justify-end gap-8 w-full xl:order-1 xl:col-span-2 xl:flex-row xl:gap-6">
        {/* {profile.url && ( */}
        <span className="flex items-center justify-center gap-2 w-full text-black font-sans font-medium text-sm dark:text-white xl:w-min xl:text-base">
          <Icon type="Globe" className="h-5 w-5 xl:h-6 xl:w-6" />
          <a
            href={profile.url}
            title="organization url"
            className="cursor-pointer hover:underline"
          >
            {profile.url} https://www.example.com
            {/* --> DELETE PRIOR TO MERGING AND UNCOMMENT THE `profile.url` CHECK */}
          </a>
        </span>
        {/* )} */}
        <button
          onClick={() => console.log("donate")}
          className="btn btn-orange w-full h-12 py-2 px-6 rounded text-sm normal-case xl:w-80"
        >
          Donate now
        </button>
      </div>

      <div className="order-1 flex flex-col gap-8 items-center w-full max-w-sm text-black dark:text-white xl:order-2 xl:gap-6 xl:items-start xl:h-full">
        <p className="font-header font-bold text-2xl max-w-[320px] truncate xl:text-3xl xl:max-w-full">
          {profile.name}
        </p>
        <span className="flex items-center justify-center gap-2 text-sm xl:text-base font-work uppercase">
          <Icon type="MapPin" className="h-5 w-5 xl:h-6 xl:w-6" />
          {profile.street_address}
        </span>
      </div>

      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching endowment balances",
          error: "Failed to get endowment balances ",
        }}
        classes={{
          container: "flex items-center justify-center w-full h-full",
        }}
      >
        {({ tokens_on_hand }) => (
          <Balances {...tokens_on_hand} className="order-3" />
        )}
      </QueryLoader>

      <div className="order-4 xl:col-span-2 w-full h-40">Overview</div>
    </div>
  );
}
