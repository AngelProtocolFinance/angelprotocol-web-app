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
      <div className="flex flex-col-reverse md:flex-row padded-container md:p-20 gap-5">
        <div className="relative w-full md:w-1/2 my-auto">
          <figure>
            <img
              src="https://charity-profile-images.s3.amazonaws.com/banner/The+5+Gyres+Institute.png"
              alt=""
              className="w-150 rounded-lg"
            />
            <figcaption className="text-white font-bold uppercasetext-left p-4">
              <div className="pb-2 text-2xl md:text-3xl">
                The 5 Gyres Institute
              </div>
              <div className="text-md md:text-lg">
                SDG #12 Responsible Consumption and Production
              </div>
            </figcaption>
          </figure>
        </div>
        <div className="text-white w-full md:w-1/2 my-auto">
          <p className="font-extrabold text-6xl lg:text-7xl mb-4">GIVE ONCE,</p>
          <p className="font-extrabold text-6xl lg:text-7xl mb-4">
            GIVE <span className="text-angel-orange">FOREVER</span>.
          </p>
          <p className="text-2xl md:text-3xl my-4">
            <span className="font-bold">
              Want to empower a charity like The 5 Gyres Institute with
              financial freedom?
            </span>{" "}
            Find a charity from the list below, connect your wallet and donate
            to their perpetual endowment.
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
