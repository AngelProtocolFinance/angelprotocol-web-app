import { useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import Slider from "rc-slider";
import AppHead from "components/Headers/AppHead";
import Loader from "components/Loader/Loader";
import toCurrency from "helpers/toCurrency";
import Liquid from "./Liquid";
import Locked from "./Locked";
// import WithdrawForm from "./WithdrawForm";
import useHoldings from "./useHoldings";
import useWithdraw from "./useWithdraw";
import { RouteComponentProps } from "react-router";

interface Values {
  withdraw: number;
}

type Param = { address: string };

export default function Withdraw(props: RouteComponentProps<Param>) {
  //use can malinger this address url param
  //can also pass address as state but no guarantee that user will go to this page using
  //only the in-app link provided
  //TODO://check if valid, redirect to somewhere if not
  const address = props.match.params.address;

  const [showModal, setShowModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const { isReady, isLoading, error, locked, liquid, overall } =
    useWithdraw(address);
  const { lockedCW20Tokens, liquidCW20Tokens } = useHoldings(address);

  const computeWithdrawAmount = (value: number) => {
    setWithdrawAmount((liquid! * value) / 100);
  };

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
          <div className="flex justify-start mt-4 pl-6">
            {/*//TODO: should disable/hide when curr wallet_addr is not endowment owner */}
            <button
              className="uppercase hover:bg-blue-accent bg-angel-blue rounded-lg w-56 h-12 text-sm font-bold"
              onClick={() => setShowModal(true)}
            >
              Withdraw from Accounts
            </button>
          </div>
          <div>
            {showModal ? (
              <div className="fixed bg-gray-800 bg-opacity-80 w-full h-full top-0 left-0 right-0 bottom-0 z-50 grid place-items-center">
                <div className="p-6 place-items-center bg-white-grey w-full max-w-xs min-h-r15 rounded-xl shadow-lg overflow-hidden relative">
                  <h3 className="mb-1 text-lg text-angel-grey text-center font-semibold font-heading">
                    Withdraw from Accounts
                  </h3>
                  <p className="mb-6 text-angel-grey text-center text-xs">
                    Enter the quantity of tokens to withdraw from each of the active Liquid Account's current strategies.
                  </p>
                  <div className="text-angel-grey">
                    <Formik<Values>
                      initialValues={{ withdraw: 0 }}
                      onSubmit={(
                        values: Values,
                        { setSubmitting }: FormikHelpers<Values>
                      ) => {
                        values.withdraw = withdrawAmount;
                        console.log(values);
                        setSubmitting(false);
                      }}
                    >
                      {/*TODO:// separate this form in separate component*/}
                      <Form>
                        <div className="flex justify-around mb-3">
                          <div className="flex-col w-1/2">
                            <div className="my-1.5">
                              <label htmlFor="withdraw">Anchor Protocol</label>
                            </div>
                            <div className="align-bottom">
                              <p className="text-xs italic">
                                Available: {toCurrency(lockedCW20Tokens! / 1e6)}
                                {} tokens
                              </p>
                              <p className="text-xs italic">
                                (~$ {toCurrency(locked)})
                              </p>
                            </div>
                          </div>
                          <div className="flex-col w-1/2">
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
                                Withdraw Amt: ~$ {withdrawAmount}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-around mt-6">
                          <button
                            type="submit"
                            className="uppercase hover:bg-blue-accent bg-angel-blue rounded-lg w-28 h-8 text-white-grey text-sm font-bold"
                          >
                            Withdraw
                          </button>
                          <button
                            onClick={() => {
                              setWithdrawAmount(0);
                              setShowModal(false);
                            }}
                            className="uppercase hover:bg-angel-orange hover:text-white-grey hover:border-opacity-0 rounded-lg w-28 h-8 text-angel-orange border-2 border-angel-orange text-sm font-bold"
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
    </section>
  );
}
