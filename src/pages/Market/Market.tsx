import AppHead from "components/Headers/AppHead";
import useProfiles from "./useProfiles";
import Index from "./Index";
import { useEffect } from "react";

export default function Market() {
  const profiles = useProfiles();

  useEffect(() => {}, []);

  const sdg_ids = Array.from(
    //consolidate present sdgs then render sdg list
    profiles.reduce((prev: Set<number>, curr) => {
      prev.add(+curr.un_sdg);
      return prev;
    }, new Set<number>())
    //sort acc to sdg number
  ).sort((a, b) => a - b);

  return (
    <div className="grid grid-rows-dashboard pb-16">
      <div className="grid grid-rows-a1 items-center justify-items-center text-center text-white bg-no-repeat bg-banner-charity bg-cover pb-4">
        <AppHead />
        <div className="padded-container">
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

      <section className="flex-auto container mx-auto px-5 mt-5">
        {sdg_ids.map((id) => (
          <Index id={id} key={id} />
        ))}
      </section>
    </div>
  );
}
