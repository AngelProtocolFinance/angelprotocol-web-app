import Loader from "components/Loader/Loader";
import Heading from "../Heading";
import Updator from "../Updator";
import View from "../View";
import Entry from "./Entry";
// import { Addresses } from "./types";
import useBoard from "./useBoard";

export default function BoardCharity() {
  const { isReady, isLoading, error, charities, refresh, lastUpdate, chainID } =
    useBoard();

  return (
    <View>
      <Updator
        isLoading={isLoading}
        refresh={refresh}
        lastUpdate={lastUpdate}
      />
      {error && (
        <p className="grid items-center uppercase text-angel-grey">{error}</p>
      )}
      {isLoading && (
        <Loader
          gapClass="gap-4"
          widthClass="w-4"
          bgColorClass="bg-angel-grey"
        />
      )}

      {isReady && (
        <div className="self-start w-full h-leader-table overflow-y-auto pl-4">
          <table className="border-collapse w-full">
            <thead className="">
              <tr>
                <Heading text="Charity" />
                <Heading text="Endowment Address" />
                <Heading text="Donations Received" />
                <Heading text="10YR Projection" />
              </tr>
            </thead>
            <tbody>
              {charities.map(([address, balance], idx) => (
                <Entry
                  key={idx}
                  balance={balance}
                  address={address}
                  chainID={chainID}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </View>
  );
}
