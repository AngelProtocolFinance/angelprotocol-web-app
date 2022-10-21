import { useBalanceQuery } from "services/juno/account";
import Icon from "components/Icon";
import { QueryLoader } from "components/admin";
import { useProfileContext } from "../ProfileContext";
import Balances from "./Balances";

export default function Body() {
  const profile = useProfileContext();
  const queryState = useBalanceQuery({ id: profile.id });

  return (
    <div className="grid grid-rows-[auto_auto_1fr] grid-cols-[auto_auto] gap-10 items-end w-full h-full pt-6 px-20 pb-20 bg-white dark:bg-blue-d4">
      <div className="col-span-2 flex items-center justify-end gap-6">
        {/* {profile.url && ( */}
        <span className="flex items-center gap-2 text-black font-sans font-medium text-base dark:text-white">
          <Icon type="Globe" className="h-6 w-6" />
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
          className="btn btn-orange w-80 h-12 py-2 px-6 rounded text-sm normal-case"
        >
          Donate now
        </button>
      </div>

      <div className="flex flex-col gap-6 items-start max-w-sm h-full text-black dark:text-white">
        <h3 className="font-header font-bold text-3xl">{profile.name}</h3>
        <span className="flex items-center justify-center gap-2 text-base font-work uppercase">
          <Icon type="MapPin" className="h-6 w-6" />
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
        {({ tokens_on_hand }) => <Balances {...tokens_on_hand} />}
      </QueryLoader>

      <div className="col-span-2 w-full h-40">Overview</div>
    </div>
  );
}
