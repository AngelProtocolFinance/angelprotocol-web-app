import { TStrategy } from "types/aws";
import Balances from "../common/Balances";
import Strategy from "./Strategy";
import { strategies } from "./strats";

export default function Invest() {
  return (
    <div>
      <h3 className="font-bold text-[2rem] mb-8 max-sm:text-center">
        Invest Dashboard
      </h3>
      <Balances />
      <h3 className="font-bold text-2xl my-8 text-center @lg:text-left">
        Featured Strategies
      </h3>
      <div className="grid gap-3">
        {strategies.map((strategy: TStrategy, idx: number) => (
          <Strategy key={idx} {...strategy} />
        ))}
      </div>
    </div>
  );
}
