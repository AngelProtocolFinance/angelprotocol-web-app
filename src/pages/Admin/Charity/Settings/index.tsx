import { Link } from "react-router-dom";
import { AccountType } from "types/contracts";
import AccountTabs from "../common/AccountTabs";

export default function Settings() {
  return (
    <div>
      <h2 className="text-[2rem] font-bold mb-8">Settings</h2>
      <div className="rounded border border-prim p-6">
        <h3 className="font-bold text-2xl mb-10">Auto-invest</h3>
        {/** future: create plan */}
        <AccountTabs
          classes={{
            tabs: "rounded-full border border-prim grid grid-cols-2 p-1 gap-2 mb-9",
            tab: "font-bold uppercase text-center aria-selected:btn-outline-filled aria-selected:rounded-full aria-selected:py-1 focus:ring-transparent",
          }}
        >
          <Strategy type="liquid" />
          <Strategy type="locked" />
        </AccountTabs>
      </div>
    </div>
  );
}

function Strategy({ type }: { type: AccountType }) {
  return (
    <div className="flex py-7 px-6 items-center border border-prim rounded justify-between">
      <h4 className="text-xl font-bold">Default {type} strategy</h4>
      <Link to={`edit/${type}`} className="btn-outline-filled px-8 py-2">
        Edit
      </Link>
    </div>
  );
}
