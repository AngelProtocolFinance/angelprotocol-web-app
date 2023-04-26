import Balances from "../common/Balances";
import Strategies from "./Strategies";

export default function Invest() {
  return (
    <div>
      <h3 className="font-bold text-[2rem] mb-8 max-sm:text-center">
        Invest Dashboard
      </h3>
      <Balances />
      <Strategies />
    </div>
  );
}
