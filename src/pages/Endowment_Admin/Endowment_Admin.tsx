import Loader from "components/Loader/Loader";
import toCurrency from "helpers/toCurrency";
import Liquid from "./Liquid";
import Locked from "./Locked";
import useWithdraw from "../../components/Withdraw/useWithdraw";
import { RouteComponentProps } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { site } from "types/routes";
import { RouteParam } from "./types";
import TransactionList from "./TransactionList";
import { useSetModal } from "components/Nodal/Nodal";
import Withdrawer from "components/Withdraw/Withdrawer";
import WithdrawSuite from "components/TransactionSuite/WithdrawSuite";

export default function Withdraw(props: RouteComponentProps<RouteParam>) {
  //use can malinger this address url param
  //can also pass address as state but no guarantee that user will go to this page using
  //only the in-app link provided
  const address = props.match.params.address;
  const { showModal } = useSetModal();

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
    showModal(WithdrawModal, {
      address: address,
    });
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

type WithdrawProps = { address: string };

function WithdrawModal(props: WithdrawProps) {
  return (
    <Withdrawer receiver={props.address}>
      <WithdrawSuite inModal />
    </Withdrawer>
  );
}
