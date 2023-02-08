import AccountTabs from "../common/AccountTabs";
import Balances from "../common/Balances";
import Investments from "./Invesments";

export default function Invest() {
  return (
    <div>
      <h3 className="font-bold text-[2rem] mb-8">Invest Dashboard</h3>
      <Balances />
      <h3 className="font-bold text-2xl mt-8 mb-4">Investments options</h3>
      <AccountTabs
        classes={{
          tabs: "rounded-full border border-prim grid grid-cols-2 p-1 gap-2 mb-8",
          tab: "font-bold uppercase rounded-full aria-selected:bg-orange-l5 aria-selected:dark:bg-blue-d6 aria-selected:border-prim aria-selected:border p-1 hover:bg-orange-l6 hover:dark:bg-bluegray",
        }}
      >
        <Investments type="liquid" />
        <Investments type="locked" />
      </AccountTabs>
    </div>
  );
}
