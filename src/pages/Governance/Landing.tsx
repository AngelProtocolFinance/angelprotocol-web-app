import { currency_text, denoms } from "constants/currency";
import Figure from "./Figure";
import Polls from "./Polls";
import Portal from "./Portal";
import useGov from "./useGov";

export default function Landing() {
  const { staked, percentStaked } = useGov();

  return (
    <div className="padded-container grid grid-rows-aa1 gap-4">
      <h2 className="font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
        Governance
      </h2>
      <div className="flex flex-wrap lg:grid lg:grid-cols-a1 xl:grid-cols-2 xl:grid-rows-2 gap-3">
        <Figure
          title="halo price"
          value={0.333}
          denom={currency_text[denoms.uusd]}
        />

        <Figure
          position="lg:row-start-2"
          title="total staked"
          value={staked}
          denom={currency_text[denoms.uhalo]}
          percent={percentStaked}
        />
        <Portal />
      </div>
      <Polls />
    </div>
  );
}
