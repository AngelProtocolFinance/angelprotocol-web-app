import { currency_text, denoms } from "constants/currency";
import Action from "./Action";
import Figure from "./Figure";
import Polls from "./Polls";
import Portal from "./Portal";
import useGov from "./useGov";
import { useHistory } from "react-router-dom";
import { app, site } from "constants/routes";

function DonationAdvert() {
  const history = useHistory();
  return (
    <div className="mt-5 w-full col-span-2 border border-opacity-10 bg-white bg-opacity-10 rounded-md p-5 text-white-grey shadow-xl cursor-pointer">
      <h4 className="text-white font-normal text-lg mt-1 mb-10 overflow-hidden">
        The charity Marketplace is now open! Give directly to the endowment of
        your choice and get 10% back in HALO airdrops.
      </h4>
      <div className="w-full flex justify-end">
        <Action
          title="Donate now"
          action={() => history.push(`${site.app}/${app.marketplace}`)}
        />
      </div>
    </div>
  );
}

export default function Landing() {
  const { staked, percentStaked, spot_price } = useGov();

  return (
    <div className="padded-container grid grid-rows-aa1 gap-4 pb-4 min-h-screen">
      <h2 className="font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
        Governance
      </h2>
      <div className="flex flex-wrap lg:grid lg:grid-cols-a1 xl:grid-cols-2 xl:grid-rows-2 gap-3">
        <Figure
          title="halo price"
          value={spot_price}
          denom={currency_text[denoms.uusd]}
          precision={6}
        />
        <Figure
          position="lg:row-start-2"
          title="total staked"
          value={staked}
          denom={currency_text[denoms.uhalo]}
          percent={percentStaked}
        />
        <Portal />
        <DonationAdvert />
      </div>
      <Polls />
    </div>
  );
}
