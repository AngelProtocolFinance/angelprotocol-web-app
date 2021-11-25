import AppHead from "components/Headers/AppHead";
import { currency_text, denoms } from "constants/currency";
import Figure from "./Figure";
import Polls from "./Polls";
import Portal from "./Portal";

export default function Governance() {
  return (
    <div className="grid grid-rows-a1 min-h-screen pt-2 pb-16">
      <AppHead />
      <div className="padded-container grid grid-rows-aa1 gap-4">
        <h2 className="font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
          Governance
        </h2>
        <div className="flex flex-wrap lg:grid lg:grid-cols-a1 xl:grid-cols-2 xl:grid-rows-2 gap-4">
          <Figure
            title="halo price"
            value={0.333}
            denom={currency_text[denoms.uusd]}
          />

          <Figure
            position="lg:row-start-2"
            title="total staked"
            value={303.76}
            denom={currency_text[denoms.uhalo]}
            percent={13.36}
          />
          <Portal />
        </div>
        <Polls />
      </div>
    </div>
  );
}
