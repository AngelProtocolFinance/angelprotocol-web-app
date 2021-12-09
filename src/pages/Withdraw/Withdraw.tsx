import { createContext, useContext, useState } from "react";
import Loader from "components/Loader/Loader";
import toCurrency from "helpers/toCurrency";
import Liquid from "./Liquid";
import Locked from "./Locked";
import WithdrawForm from "./WithdrawForm";
import useWithdraw from "./useWithdraw";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";
import { site } from "types/routes";
import { RouteParam, Steps, Status, SetStatus } from "./types";
import DappHead from "components/Headers/DappHead";

const initialStatus = {
  step: Steps.initial,
};

const getContext = createContext<Status>(initialStatus);
const setContext = createContext<SetStatus>(() => initialStatus);
//use these hooks only in components inside Withdraw.tsx
export const useGetStatus = () => useContext(getContext);
export const useSetStatus = () => useContext(setContext);

export default function Withdraw(props: RouteComponentProps<RouteParam>) {
  //use can malinger this address url param
  //can also pass address as state but no guarantee that user will go to this page using
  //only the in-app link provided
  const address = props.match.params.address;
  const [status, setStatus] = useState<Status>(initialStatus);
  const [withdrawFormIsOpen, setWithdrawForm] = useState(false);

  const {
    redirect,
    isReady,
    isLoading,
    isEndowmentOwner,
    error,
    locked,
    liquid,
    overall,
  } = useWithdraw(address);

  function openWithdrawForm() {
    setWithdrawForm(true);
  }

  function closeWithdrawForm() {
    setWithdrawForm(false);
  }

  return (
    <div className="pb-16 grid content-start min-h-screen">
      <DappHead />
      {redirect ? <Redirect to={site.app} /> : null}
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
        <div className="mt-0 md:mt-8 mx-auto w-auto text-white-grey">
          <div className="flex justify-center md:justify-start">
            <h2 className="md:pt-8 md:pl-6 uppercase text-lg font-bold">
              Total Balance: $ {toCurrency(overall)}
            </h2>
          </div>
          <div className="flex flex-wrap items-stretch justify-around mt-3 mx-4">
            <Liquid liquidBalance={liquid} />
            <Locked lockedBalance={locked} />
          </div>
          <div className="flex justify-center md:justify-start mt-0 md:mt-4 md:pl-6">
            {isEndowmentOwner ? (
              <button
                className="uppercase hover:bg-blue-accent bg-angel-blue rounded-lg w-56 h-12 text-sm font-bold"
                onClick={openWithdrawForm}
              >
                Withdraw from Accounts
              </button>
            ) : null}
          </div>
          <div>
            <getContext.Provider value={status}>
              <setContext.Provider value={setStatus}>
                <WithdrawForm
                  address={address}
                  liquid={liquid!}
                  isModalOpened={withdrawFormIsOpen}
                  onCloseModal={closeWithdrawForm}
                />
              </setContext.Provider>
            </getContext.Provider>
          </div>
        </div>
      )}
    </div>
  );
}
