import FundVid from "./FundVid";
import fundLogo from "assets/images/unsdg-gender-equality.png";
import { charities } from "./charities";
import CharityCard from "components/CharityCard";
// import Overview from "./Overview";
import Overview from "./Overview";
import useFund from "./useFund";
import Donate from "./Donate";
import DappHead from "components/Headers/DappHead";

//props
//fundBgClass
//fundLogo
//heading
//description
export default function Fund() {
  const { isDonating, toggleDonate, error, loading, split } = useFund();
  return (
    <section className="grid content-start pb-24">
      <DappHead />
      <div className="grid grid-rows-fund grid-cols-1a container mx-auto gap-4">
        <div className="col-start-1 col-span-1 bg-red-700 self-stretch grid grid-cols-a1 items-center rounded-xl shadow-md">
          <img src={fundLogo} alt="" className="h-44 m-9" />
          <h1 className="text-5xl text-white uppercase font-bold ">
            <div className="mb-2">UNSDG #5</div>
            <div>Gender Quality</div>
          </h1>
        </div>
        <FundVid />
        {(isDonating && (
          <Donate split={split} loading={loading} error={error} />
        )) || <Overview />}

        <div className="col-start-2 col-span-1 row-start-2 row-span-1 self-start">
          <button
            onClick={toggleDonate}
            className={`${
              isDonating ? "bg-yellow-blue" : "bg-angel-orange"
            } uppercase text-white text-sm w-36 py-2 rounded-lg font-semibold shadow-md`}
          >
            {isDonating ? "Back to Index" : "Donate"}
          </button>
          <button className="ml-2 bg-angel-blue uppercase text-white text-sm w-36 py-2 rounded-lg font-semibold shadow-md">
            Share
          </button>
        </div>
      </div>
      <div className="mt-8 container mx-auto text-white-grey">
        <p className="uppercase text-2xl font-heading font-semibold mb-4">
          Charities in this index
        </p>
        <ul className="flex flex-wrap gap-4">
          {charities.map((data) => (
            <CharityCard key={data.id} {...data} />
          ))}
        </ul>
      </div>
    </section>
  );
}
