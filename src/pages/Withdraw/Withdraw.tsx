import { useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import AppHead from "components/Headers/AppHead";
import Loader from "components/Loader/Loader";
import toCurrency from "helpers/toCurrency";
import Liquid from "./Liquid";
import Locked from "./Locked";
// import WithdrawForm from "./WithdrawForm";
import useWithdraw from "./useWithdraw";
import { RouteComponentProps } from "react-router";

interface Values {
  withdrawAnc: string;
}

type Param = { address: string };

export default function Withdraw(props: RouteComponentProps<Param>) {
  //use can malinger this address url param
  //can also pass address as state but no guarantee that user will go to this page using
  //only the in-app link provided
  //TODO://check if valid, redirect to somewhere if not
  const address = props.match.params.address;

  const [showModal, setShowModal] = useState(false);
  const { isReady, isLoading, error, locked, liquid, overall } =
    useWithdraw(address);

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
                    Enter the quantity of tokens to withdraw from each of the
                    active Liquid Account's current strategies.
                  </p>
                  {/* <WithdrawForm /> */}
                  <div className="text-angel-grey">
                    <Formik
                      initialValues={{ withdrawAnc: "" }}
                      onSubmit={(
                        values: Values,
                        { setSubmitting }: FormikHelpers<Values>
                      ) => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }}
                    >
                      {/*TODO:// separate this form in separate component*/}
                      <Form>
                        <div className="flex justify-around mb-3">
                          <div className="flex-col w-full">
                            <label htmlFor="withdrawAnc">Anchor Protocol</label>
                            <p className="text-xs italic">
                              Available: $ {toCurrency(liquid)}
                            </p>
                          </div>
                          <Field
                            className="bg-gray-200 w-full p-3 rounded-md focus:outline-none"
                            id="withdrawAnc"
                            name="withdrawAnc"
                            autoComplete="off"
                            type="text"
                          />
                        </div>
                        <div className="flex justify-around mt-6">
                          <button
                            type="submit"
                            className="uppercase hover:bg-blue-accent bg-angel-blue rounded-lg w-28 h-8 text-white-grey text-sm font-bold"
                          >
                            Withdraw
                          </button>
                          <button
                            onClick={() => setShowModal(false)}
                            className="uppercase hover:bg-angel-orange bg-orange rounded-lg w-28 h-8 text-white-grey text-sm font-bold"
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
