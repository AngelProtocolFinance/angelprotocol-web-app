import { useBalanceQuery } from "services/juno/account";
import Icon from "components/Icon";
import { QueryLoader } from "components/admin";
import { useProfileContext } from "../ProfileContext";

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
          className="btn btn-orange w-80 h-12 py-2 px-6 rounded text-sm"
        >
          Donate now
        </button>
      </div>
      <div className="flex flex-col gap-6 items-start max-w-sm text-black dark:text-white">
        <h3 className="font-header font-bold text-3xl">{profile.name}</h3>
        <span className="flex items-center justify-center gap-2 text-base font-work uppercase">
          <Icon type="MapPin" className="h-6 w-6" />
          {profile.street_address}
        </span>
      </div>
      <div className="flex items-center justify-cener gap-4 w-full">
        <QueryLoader
          queryState={queryState}
          messages={{
            loading: "Fetching endowment balances",
            error: "Failed to get endowment balances ",
          }}
        >
          {({ tokens_on_hand: { locked, liquid } }) => (
            <>
              <Balance title="Total Value" amount={293.281} />
              <Balance title="Total Locked Account" amount={293.281} />
              <Balance title="Total Liquid Account" amount={293.281} />
            </>
          )}
        </QueryLoader>
      </div>
      <div className="col-span-2 w-full h-40">Overview</div>
    </div>
  );
}

function Balance({ title, amount }: { title: string; amount: number }) {
  return (
    <div className="flex flex-col justify-center items-start px-6 gap-2 border border-gray-l2 rounded">
      <h6 className="font-heading font-bold text-xs tracking-wider uppercase">
        {title}
      </h6>
      <p className="font-work font-normal text-lg text-gray-d1">${amount}</p>
    </div>
  );
}
