import AppHead from "components/Headers/AppHead";
import Loader from "components/Loader/Loader";
import toCurrency from "helpers/toCurrency";
import Liquid from "./Liquid";
import Locked from "./Locked";
import useWithdraw from "./useWithdraw";

export default function Withdraw() {
  const { isReady, isLoading, error, locked, liquid, overall } = useWithdraw();

  return (
    <section className="pb-16 grid content-start h-screen">
      <AppHead />
      {error && (
        <div className="min-h-leader-table grid place-items-center">
          <p className="uppercase text-white-grey">{error}</p>
        </div>
      )}
      {isLoading && (
        <div className="min-h-leader-table grid place-items-center">
          <Loader
            gapClass="gap-4"
            widthClass="w-4"
            bgColorClass="bg-white-grey"
          />
        </div>
      )}
      {isReady && (
        <div className="mt-8 mx-auto w-auto text-white-grey">
          <h2 className="pt-8 pl-5 uppercase text-lg font-bold">
            Total Balance: UST {toCurrency(overall)}
          </h2>
          <div className="flex items-stretch mt-3 mx-4">
            <Liquid liquidBalance={liquid} />
            <Locked lockedBalance={locked} />
          </div>
          <button className="uppercase hover:bg-blue-accent bg-angel-blue rounded-lg mt-3 ml-5 pr-4 pl-4 w-auto h-12 d-flex justify-center items-center text-sm font-bold">
            Withdraw from Liquid Account
          </button>
          <button
            disabled
            className="cursor-default uppercase bg-grey-accent rounded-lg mt-3 ml-5 pr-4 pl-4 w-auto h-12 d-flex justify-center items-center text-sm font-bold"
          >
            Change Strategies
          </button>
        </div>
      )}
    </section>
  );
}
