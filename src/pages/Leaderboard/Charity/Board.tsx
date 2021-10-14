import Loader from "components/Loader/Loader";
import Heading from "../Heading";
import Entry from "./Entry";
import useBoard from "./useBoard";

export default function BoardCharity() {
  const { isReady, isLoading, error, charities } = useBoard();

  return (
    <div className="min-h-leader-table p-6 my-5 grid place-items-center overflow-hidden bg-white-grey rounded-xl shadow-lg padded-container">
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
        <div className="self-start w-full h-leader-table overflow-y-auto">
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
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
