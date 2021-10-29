import { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import Slider from "rc-slider";
import AppHead from "components/Headers/AppHead";
import Loader from "components/Loader/Loader";
import toCurrency from "helpers/toCurrency";
import Liquid from "./Liquid";
import Locked from "./Locked";
// import WithdrawForm from "./WithdrawForm";
import useHoldings from "./useHoldings";
import useWithdraw from "./useWithdraw";
import useWithdrawHoldings from "./useWithdrawHoldings";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";
import { site } from "types/routes";

interface Values {
  withdraw: string;
}

type Param = { address: string };

export default function Withdraw(props: RouteComponentProps<Param>) {
  //use can malinger this address url param
  //can also pass address as state but no guarantee that user will go to this page using
  //only the in-app link provided
  const address = props.match.params.address;

  const [showModal, setShowModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [withdrawTokenQty, setWithdrawTokenQty] = useState("");
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
  const { liquidCW20Tokens, anchorVault } = useHoldings(address);

  const computeWithdrawAmount = (value: number) => {
    // value is the percentage based on the slider
    setWithdrawAmount((liquid! * value) / 100);
    setWithdrawTokenQty(((liquidCW20Tokens! * value) / 100 / 1e6).toString());
  };

  const withdrawHoldings = useWithdrawHoldings(
    address,
    anchorVault,
    withdrawTokenQty
  );

  return (
    <div className="pb-16 grid content-start min-h-screen">
      <AppHead />
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
                onClick={() => setShowModal(true)}
              >
                Withdraw from Accounts
              </button>
            ) : null}
          </div>
          <div>
            {showModal ? (
              <div className="absolute bg-gray-800 bg-opacity-80 w-full h-full top-0 left-0 right-0 bottom-0 z-50 grid place-items-center">
                <div className="p-3 md:p-6 bg-white-grey w-full max-w-xs min-h-r15 rounded-xl shadow-lg overflow-hidden relative">
                  <h3 className="mb-1 text-lg text-angel-grey text-center font-semibold font-heading">
                    Withdraw from Accounts
                  </h3>
                  <p className="mb-3 md:mb-6 text-angel-grey text-center text-xs">
                    Enter the quantity of tokens to withdraw from each of the
                    active Liquid Account's current strategies.
                  </p>
                  {/* <WithdrawForm /> */}
                  <div className="text-angel-grey">
                    <Formik<Values>
                      initialValues={{ withdraw: "0" }}
                      onSubmit={withdrawHoldings}
                    >
                      {/*TODO:// separate this form in separate component*/}
                      <Form>
                        <div className="flex flex-row justify-around mb-3">
                          <div>
                            <div className="my-1.5">
                              <label htmlFor="withdraw">Anchor Protocol</label>
                            </div>
                            <div className="align-bottom">
                              <p className="text-xs italic">
                                Available: {toCurrency(liquidCW20Tokens! / 1e6)}
                                {} tokens
                              </p>
                              <p className="text-xs italic">
                                (~$ {toCurrency(liquid)})
                              </p>
                            </div>
                          </div>
                          <div>
                            <div className="my-3">
                              <Slider
                                min={0}
                                max={100}
                                defaultValue={0}
                                onChange={computeWithdrawAmount}
                              />
                            </div>
                            <div className="align-bottom">
                              <p className="text-xs italic py-px">
                                Withdraw Amt: ~$ {toCurrency(withdrawAmount)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row mt-6">
                          <button
                            type="submit"
                            className="m-auto uppercase hover:bg-blue-accent bg-angel-blue rounded-lg w-28 h-8 text-white-grey text-sm font-bold"
                          >
                            Withdraw
                          </button>
                          <button
                            onClick={() => {
                              setWithdrawAmount(0);
                              setShowModal(false);
                            }}
                            className="m-auto uppercase hover:bg-angel-orange hover:text-white-grey hover:border-opacity-0 rounded-lg w-28 h-8 text-angel-orange border-2 border-angel-orange text-sm font-bold"
                          >
                            Cancel
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
