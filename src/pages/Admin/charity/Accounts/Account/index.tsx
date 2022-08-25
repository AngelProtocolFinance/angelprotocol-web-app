import { GenericBalance } from "types/server/contracts";
import useWithdrawer from "../../Withdrawer/useWithdrawer";
import Holdings from "./Holdings";

type Locked = {
  type: "locked";
  balance: GenericBalance;
};

type Liquid = {
  type: "liquid";
  balance: GenericBalance;
};

type TAcount = Locked | Liquid;
export default function Account(props: TAcount) {
  const title = props.type === "liquid" ? "Liquid" : "Locked";

  const showWithdraw = useWithdrawer(props.balance);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] rounded-md text-white/80 shadow-inner bg-white/10 p-4">
      <h3 className="mb-2 text-lg w-full font-bold uppercase flex items-center justify-self-start">
        <span>{title}</span>
        {props.type === "liquid" && (
          <button
            onClick={showWithdraw}
            className="ml-auto bg-angel-blue hover:bg-bright-blue disabled:bg-grey-accen px-2 py-1 rounded-md uppercase text-sm font-heading"
          >
            withdraw
          </button>
        )}
      </h3>
      <Holdings balance={props.balance} />
    </div>
  );
}
