import Loader from "components/Loader/Loader";
import useLeaderboard from "./useLeaderboard";
import tcaLogo from "assets/icons/tcalogo.png";
import Heading from "./Heading";
import Entry from "./Entry";

export default function BoardTCA() {
  const { sums, error, isReady, isLoading } = useLeaderboard();
  return (
    <div className="p-6 my-5 grid grid-cols-a1 place-items-center overflow-hidden bg-white-grey rounded-xl shadow-lg padded-container">
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
        <div className="self-start w-full h-leader-table overflow-y-auto">
          <table className="border-collapse w-full">
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
        </div>
      )}
    </div>
  );
}
