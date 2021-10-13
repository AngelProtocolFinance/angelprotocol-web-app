import AppHead from "components/Headers/AppHead";
import useLeaderboard from "./useLeaderboard";
import tcaLogo from "assets/icons/tcalogo.png";
import Entry from "./Entry";
import { Names } from "./names";
import Heading from "./Heading";
import Loader from "components/Loader/Loader";

export default function Leaderboard() {
  const { sums, error, isReady, isLoading } = useLeaderboard();
  //cast names to desired type
  return (
    <section className="pb-16 grid h-screen grid-rows-a1">
      <AppHead />
      <div className="p-6 my-10 grid grid-cols-a1 place-items-center overflow-hidden container mx-auto bg-white-grey  rounded-xl shadow-lg">
        <img className="m-20 w-60 h-60" src={tcaLogo} />
        {error && <p className="uppercase text-angel-grey">{error}</p>}
        {isLoading && (
          <Loader
            gapClass="gap-4"
            widthClass="w-4"
            bgColorClass="bg-angel-grey"
          />
        )}
        {isReady && (
          <table className="border-collapse self-start w-full">
            <thead className="">
              <tr>
                <Heading text="TCA Member" />
                <Heading text="Total Donation" />
              </tr>
            </thead>
            <tbody>
              {sums.map(([name, amount], idx) => (
                <Entry key={idx} name={name} amount={amount} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
