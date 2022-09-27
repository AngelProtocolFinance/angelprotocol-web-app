import { GenericBalance } from "types/contracts";
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
export default function Account({ type, balance }: TAcount) {
  const { cw20, native } = balance;
  return (
    <div className="grid grid-rows-[auto_1fr_auto] rounded-md text-white/80 p-4 border border-zinc-50/20">
      <h3 className="mb-2 text-lg w-full font-bold uppercase flex items-center justify-self-start">
        <span>{type}</span>
      </h3>
      {((cw20.length > 0 || native.length > 0) && (
        <Holdings balance={balance} />
      )) || <p>0.000</p>}
    </div>
  );
}
