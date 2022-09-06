import { AccountType, GenericBalance } from "types/contracts";
import useWithdrawer from "../../Withdrawer/useWithdrawer";
import Holdings from "./Holdings";

type Props = {
  type: AccountType;
  balance: GenericBalance;
};

export default function Account(props: Props) {
  const title = props.type === "liquid" ? "Liquid" : "Locked";

  const showWithdraw = useWithdrawer(props.balance);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] text-white/80 border-2 border-zinc-50/20 rounded-md p-4">
      <h3 className="mb-2 text-lg w-full font-bold uppercase flex items-center justify-self-start">
        <span>{title}</span>
        {props.type === "liquid" && (
          <button
            onClick={showWithdraw}
            className="ml-auto bg-angel-blue hover:bg-bright-blue disabled:bg-grey-accent px-2 py-1 rounded-md uppercase text-sm font-heading"
          >
            withdraw
          </button>
        )}
      </h3>
      <Holdings balance={props.balance} />
    </div>
  );
}
