import AppHead from "components/Headers/AppHead";
import Index from "./Index";

export default function Market() {
  return (
    <div className="grid grid-rows-dashboard pb-16">
      <div className="grid grid-rows-a1 items-center justify-items-center text-center text-white bg-no-repeat bg-banner-charity bg-cover h-80">
        <AppHead />
        <div className="padded-container">
          <p className="uppercase text-2xl xl:text-4xl">
            we categorize our charities based on the
          </p>
          <p className="font-extrabold text-2xl xl:text-4xl my-2">
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

//construct [1...17]
const sdg_ids = Array(16)
  .fill(1)
  .map((e, i) => e + i);
