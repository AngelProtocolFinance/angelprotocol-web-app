import { createContext, useContext, useState } from "react";
import Loader from "components/Loader/Loader";
import toCurrency from "helpers/toCurrency";
import Liquid from "./Liquid";
import Locked from "./Locked";
import WithdrawForm from "./WithdrawForm";
import useWithdraw from "./useWithdraw";
import { RouteComponentProps } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { site } from "types/routes";
import { RouteParam, Steps, Status, SetStatus } from "./types";
import TransactionList from "./TransactionList";

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
    <div className="grid content-start">
      {redirect ? <Redirect to={site.app} /> : null}
      {error && (
        <div className="min-h-withdraw-table grid place-items-center">
          <p className="uppercase text-white-grey">{error}</p>
        </div>
      )}
      {isLoading && (
        <div className="min-h-withdraw-table grid place-items-center">
          <Loader
            gapClass="gap-4"
            widthClass="w-4"
            bgColorClass="bg-white-grey"
          />
        </div>
      )}
      {isReady && (
        <div className="padded-container justify-center">
          <div className="mt-0 md:mt-8 mx-auto w-auto text-white-grey">
            <h2 className="uppercase mb-2">
              <span className="uppercase text-xs mr-0.5">Total Balance </span>
              <span className="text-lg font-semibold">
                ${toCurrency(overall)}
              </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Liquid
                liquidBalance={liquid}
                opener={openWithdrawForm}
                isOwner={isEndowmentOwner}
              />
              <Locked lockedBalance={locked} />
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
          <div className="self-start mb-6 mt-4 w-full font-heading">
            <TransactionList address={address} />
          </div>
        </div>
        // <div className="flex justify-end padded-container mb-6 md:px-10 xl:px-6 px-6">
        //   <button
        //     className="uppercase hover:bg-blue-accent bg-angel-blue rounded-lg w-56 h-12 text-sm font-bold text-white"
        //     // onClick={openWithdrawForm}
        //   >
        //     Manage Admins
        //   </button>
        // </div>
      )}
    </div>
  );
}
