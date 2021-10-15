import Loader from "components/Loader/Loader";
import Heading from "../Heading";
import Entry from "./Entry";
// import { Addresses } from "./types";
import useBoard from "./useBoard";

export default function BoardCharity() {
  const { isReady, isLoading, error, charities, refresh, lastUpdate } =
    useBoard();

  return (
    <div className="relative min-h-leader-table p-6 pt-10 my-5 mt-2 grid place-items-center overflow-hidden bg-white rounded-xl shadow-lg padded-container">
      <div className="flex absolute top-3 right-6 gap-2 text-sm font-body">
        <p className="text-angel-grey">
          last update: {new Date(lastUpdate).toLocaleTimeString()}
        </p>
        <button
          className="uppercase text-xs bg-angel-blue disabled:bg-thin-grey px-2 text-white rounded-sm font-semibold"
          disabled={isLoading}
          onClick={refresh}
        >
          update
        </button>
      </div>
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
              </tr>
            </thead>
            <tbody>
              {charities.map(([address, balance], idx) => (
                <Entry key={idx} balance={balance} address={address} />
              ))}
              {/* <Entry
                key={1}
                balance={{ total_locked: 1000, total_liq: 1000, overall: 1000 }}
                address={Addresses.terra12crxq8nxml96e9h38fe67c4p76pc24l54zjzzh}
              />
              <Entry
                key={1}
                balance={{ total_locked: 1000, total_liq: 1000, overall: 1000 }}
                address={Addresses.terra12crxq8nxml96e9h38fe67c4p76pc24l54zjzzh}
              />
              <Entry
                key={1}
                balance={{ total_locked: 1000, total_liq: 1000, overall: 1000 }}
                address={Addresses.terra12crxq8nxml96e9h38fe67c4p76pc24l54zjzzh}
              />
              <Entry
                key={1}
                balance={{ total_locked: 1000, total_liq: 1000, overall: 1000 }}
                address={Addresses.terra12crxq8nxml96e9h38fe67c4p76pc24l54zjzzh}
              />
              <Entry
                key={1}
                balance={{ total_locked: 1000, total_liq: 1000, overall: 1000 }}
                address={Addresses.terra12crxq8nxml96e9h38fe67c4p76pc24l54zjzzh}
              />
              <Entry
                key={1}
                balance={{ total_locked: 1000, total_liq: 1000, overall: 1000 }}
                address={Addresses.terra12crxq8nxml96e9h38fe67c4p76pc24l54zjzzh}
              />
              <Entry
                key={1}
                balance={{ total_locked: 1000, total_liq: 1000, overall: 1000 }}
                address={Addresses.terra12crxq8nxml96e9h38fe67c4p76pc24l54zjzzh}
              /> */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
