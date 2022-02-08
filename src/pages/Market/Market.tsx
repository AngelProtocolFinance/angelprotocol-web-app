import { useMemo } from "react";
import Index from "./Index";
import { useProfilesQuery } from "services/aws/endowments/endowments";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import { chainIDs } from "constants/chainIDs";
import transitionIn, { Direction } from "../../helpers/transitionIn";
import wingImage from "../../assets/images/angelprotocol-wings-wht.png";

export default function Market() {
  const wallet = useConnectedWallet();
  const isTest = wallet?.network.chainID === chainIDs.testnet;
  const { data: profiles = [], isLoading } = useProfilesQuery(isTest);

  const sdg_ids = useMemo(
    () =>
      Array.from(
        //consolidate present sdgs then render sdg list
        profiles.reduce((prev: Set<number>, curr) => {
          curr.un_sdg && prev.add(+curr.un_sdg);
          return prev;
        }, new Set<number>())
        //sort acc to sdg number
      ).sort((a, b) => a - b),
    [profiles]
  );

  return (
    <div className="grid grid-rows-dashboard pb-16">
      <div className="flex flex-col md:flex-row w-full justify-center items-center text-white bg-no-repeat bg-banner-charity bg-cover py-10">
        <img src={wingImage} alt="" className={`lg:w-80`} />
        <div className="px-6">
          <p className="font-extrabold text-3xl md:text-4xl xl:text-6xl my-4">
            GIVE ONCE, GIVE FOREVER
          </p>
          <p className="text-lg md:text-2xl xl:text-4xl my-4">
            Browse the charity marketplace below.
          </p>
          <p className="text-lg md:text-2xl xl:text-4xl">
            Choose a charity, connect your wallet and donate to their perpetual
            endowment.
          </p>
        </div>
      </div>
      {isLoading && (
        <div className="h-40 bg-opacity-5 rounded-lg grid place-items-center">
          <Loader
            bgColorClass="bg-white-grey bg-opacity-80"
            gapClass="gap-2"
            widthClass="w-4"
          />
        </div>
      )}
      <section className="flex-auto padded-container mx-auto px-5 mt-5">
        {sdg_ids.map((id) => (
          <Index id={id} key={id} />
        ))}
      </section>
    </div>
  );
}
