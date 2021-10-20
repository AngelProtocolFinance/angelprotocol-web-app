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
          <h2 className="pt-8 pl-6 uppercase text-lg font-bold">
            Total Balance: $ {toCurrency(overall)}
          </h2>
          <div className="flex items-stretch mt-3 mx-4">
            <Liquid liquidBalance={liquid} />
            <Locked lockedBalance={locked} />
          </div>
          <div className="flex justify-center mt-4">
            {/*//TODO: should disable/hide when curr wallet_addr is not endowment owner */}
            <button className="uppercase hover:bg-blue-accent bg-angel-blue rounded-lg pr-4 pl-4 h-12 text-sm font-bold">
              Withdraw from Account
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
