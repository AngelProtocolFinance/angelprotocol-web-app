import Loader from "components/Loader/Loader";
import tcaLogo from "assets/images/tca1600.png";
import Entry from "./Entry";
import useBoard from "./useBoard";
import Heading from "../Heading";
import View from "../View";
import Updator from "../Updator";

export default function Board() {
  const { sums, error, isReady, isLoading, refresh, lastUpdate } = useBoard();
  return (
    <View className="grid-cols-a1">
      <Updator
        refresh={refresh}
        lastUpdate={lastUpdate}
        isLoading={isLoading}
      />
      <img className="m-20 w-60" src={tcaLogo} alt="" />
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
    </View>
  );
}
