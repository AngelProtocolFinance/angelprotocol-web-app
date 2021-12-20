import Loader from "components/Loader/Loader";
import Updator from "./Updator";
import useBoard from "./useBoard";
import TableView from "./TableView";

export default function Board() {
  const { isReady, isLoading, error, charities, refresh, lastUpdate } =
    useBoard();

  return (
    <div className="relative min-h-leader-table p-6 pt-10 my-5 mt-2 grid place-items-center overflow-hidden bg-white rounded-xl shadow-lg">
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
      {isReady && <TableView charities={charities} />}
    </div>
  );
}
