import { useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { FaCheck } from "react-icons/fa";
import * as Yup from "yup";
import {
  useAddCharityMetadataMutation,
  useUpdateCharityMetadataMutation,
} from "api/charityAPIs";
import { useSelector } from "react-redux";
import { TStore } from "Redux/store";
import { toast, ToastContainer } from "react-toastify";

export const WalletSchema = Yup.object().shape({
  wallet_number: Yup.number()
    .required("Please enter the number of your wallet")
    .positive()
    .integer("It must be numeric."),
});

export type Values = {
  wallet_number: string;
};

const ConnectWallet = () => {
  const [isSuccess, setSuccess] = useState(false);
  const [addCharityMetaProfile] = useAddCharityMetadataMutation();
  const { userData } = useSelector((state: TStore) => state.user);

  const onConnectWallet = async (
    values: Values,
    actions: FormikHelpers<Values>
  ) => {
    actions.setSubmitting(true);
    const response: any = await addCharityMetaProfile({
      body: { TerraWallet: values.wallet_number },
      uuid: userData.PK,
    });
    let result = response.data ? response : response.error;
    console.log("result => ", result);
    if (result.status === 500) {
      toast.error("Saving data was failed. Please try again.");
      setSuccess(false);
    } else if (result.error) {
      toast.error(result.error.data.message);
      setSuccess(false);
    } else {
      if (
        result.status === 400 ||
        result.status === 401 ||
        result.status === 403
      ) {
        toast.error(result.data.message);
        setSuccess(false);
      } else {
        toast.success("Your wallet number was saved successfully.");
        setSuccess(true);
      }
    }
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
      <ToastContainer />
    </div>
  );
};

export default ConnectWallet;
