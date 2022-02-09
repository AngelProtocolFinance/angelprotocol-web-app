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
      <div className="flex flex-row w-full items-center gap-10 bg-no-repeat bg-banner-charity bg-cover py-10">
        <div className="w-1/6"></div>
        <div className="relative w-2/6 place-content-center">
          <figure>
            <img
              src="https://charity-profile-images.s3.amazonaws.com/banner/The+5+Gyres+Institute.png"
              alt=""
              className={`w-150`}
            />
            <figcaption className="text-white font-bold uppercasetext-left p-4">
              <div className="pb-2 text-lg lg:text-xl xl:text-2xl">
                The 5 Gyres Institute
              </div>
              <div className="text-md lg:text-lg xl:text-xl">SDG #5</div>
            </figcaption>
          </figure>
        </div>
        <div className="w-2/6 text-white">
          <p className="font-extrabold text-4xl md:text-5xl xl:text-6xl my-4">
            GIVE ONCE, GIVE <span className="text-angel-orange">FOREVER</span>.
          </p>
          <p className="text-xl md:text-2xl xl:text-3xl my-4">
            <span className="font-bold">
              Want to empower a charity like The 5 Gyres Institute with
              financial freedom?
            </span>{" "}
            Find a charity from the list below, connect your wallet and donate
            to their perpetual endowment.
          </p>
        </div>
        <div className="w-1/6"></div>
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
