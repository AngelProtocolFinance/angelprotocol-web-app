import { GenericBalance } from "types/contracts";
import { denoms, tokens } from "constants/tokens";
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
    <div className="grid grid-rows-[auto_1fr_auto] rounded-md  p-4 border border-white/20">
      <h3 className="mb-2 text-lg w-full font-bold uppercase flex items-center justify-self-start">
        <span>{type === "locked" ? "Locked" : "Liquid"}</span>
      </h3>
      {((cw20.length > 0 || native.length > 0) && (
        <Holdings balance={balance} />
      )) || (
        <span className="flex items-center gap-2">
          <img
            className="w-6 h-6 object-contain"
            src={tokens[denoms.axlusdc].icon}
            alt="axlUSDC"
          />
          0.000
        </span>
      )}
    </div>
  );
}
