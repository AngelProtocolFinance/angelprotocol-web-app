import Loader from "components/Loader/Loader";
import tcaLogo from "assets/images/angel_alliance.png";
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
      <div className="hidden md:block">
        <img className="mr-10 w-80" src={tcaLogo} alt="" />
      </div>
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
                <Heading text="Alliance Member" />
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
