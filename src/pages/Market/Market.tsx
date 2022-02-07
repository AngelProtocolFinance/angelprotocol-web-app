import { useMemo } from "react";
import Index from "./Index";
import { useProfilesQuery } from "services/aws/endowments/endowments";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import { chainIDs } from "constants/chainIDs";

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
      <div className="grid items-center justify-items-center text-center text-white bg-no-repeat bg-banner-charity bg-cover pb-4">
        <div className="px-2">
          <p className="uppercase text-lg md:text-2xl xl:text-4xl">
            we categorize our charities based on the
          </p>
          <p className="font-extrabold text-xl md:text-xl xl:text-4xl my-2">
            17 UNITED NATIONS SUSTAINABLE DEVELOPMENT GOALS (UNSDGs)
          </p>
          <a
            href="https://sdgs.un.org/goals"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-48 uppercase bg-yellow-blue p-1.5 rounded-lg font-bold mt-5"
          >
            learn more
          </a>
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
