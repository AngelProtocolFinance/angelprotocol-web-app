import { useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { FaCheck } from "react-icons/fa";
import * as Yup from "yup";

export const WalletSchema = Yup.object().shape({
  wallet_number: Yup.number()
    .required()
    .positive()
    .integer("Please enter the number of your wallet."),
});

export type Values = {
  wallet_number: string;
};

const ConnectWallet = () => {
  const [isSuccess, setSuccess] = useState(false);

  const onConnectWallet = (values: Values, actions: FormikHelpers<Values>) => {
    actions.setSubmitting(true);
    setSuccess(true);
    console.log("number => ", values.wallet_number);
  };
  return (
    <div>
      <div className="title">
        {isSuccess ? (
          <div className="text-center items-center">
            <div className="flex justify-center mb-5">
              <FaCheck className="text-3xl text-white" />
            </div>
            <p className="text-3xl font-bold uppercase">success!</p>
          </div>
        ) : (
          <p className="text-3xl font-bold">Connect your wallet</p>
        )}
      </div>
      <div className="wallet-info">
        <div>
          <Formik
            initialValues={{ wallet_number: "" }}
            validationSchema={WalletSchema}
            onSubmit={onConnectWallet}
          >
            {({ isSubmitting, status }) => (
              <Form className="text-center">
                <div className="my-10 text-left relative max-w-xl mx-auto">
                  {!isSuccess && (
                    <p className="text-sm text-gray-400 font-bold mb-1">
                      Terra Wallet<span className="text-red-700">*</span>
                    </p>
                  )}
                  <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                    <span className="text-black px-1">terra</span>
                    <Field
                      type="text"
                      className="text-sm sm:text-base outline-none border-none w-full pr-3 bg-gray-200 text-black"
                      placeholder="Wallet Number"
                      name="wallet_number"
                      disabled={isSuccess}
                    />
                  </div>
                  <ErrorMessage
                    className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                    name="wallet_number"
                    component="div"
                  />
                </div>
                <button
                  type="submit"
                  className="disabled:bg-grey-accent bg-thin-blue text-center w-48 h-12 rounded-2xl tracking-widest uppercase text-base font-bold text-white mb-10"
                  disabled={isSubmitting || isSuccess}
                >
                  SUBMIT
                </button>
                {isSuccess && (
                  <p>
                    Thanks, we've been notified and we'll get in touch with you
                    very soon!
                  </p>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
