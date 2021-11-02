import Loader from "components/Loader/Loader";
import Heading from "../Heading";
import Updator from "../Updator";
import View from "../View";
import Entry from "./Entry";
import Tooltip from "./Tooltip";
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
        <div className="self-start w-full h-leader-table pl-4 overflow-y-scroll overflow-x-scroll">
          <table className="border-collapse table-auto w-full">
            <thead className="">
              <tr>
                <Heading text="Charity" />
                <Heading text="Endowment Address" />
                <Heading text="10YR Endowment Growth" />
                <Heading text="10YR Impact">
                  <Tooltip />
                </Heading>
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
