import { useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { FaCheck } from "react-icons/fa";
import * as Yup from "yup";
import { useAddCharityMetadataMutation } from "services/aws/charity";
import { toast, ToastContainer } from "react-toastify";
import Action from "../Action";
import { register } from "types/routes";
import { useHistory } from "react-router";
import { useGetter } from "store/accessors";

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
  const user = useGetter((state) => state.user);
  const history = useHistory();

  const onConnectWallet = async (
    values: Values,
    actions: FormikHelpers<Values>
  ) => {
    actions.setSubmitting(true);
    const response: any = await addCharityMetaProfile({
      body: { TerraWallet: values.wallet_number },
      uuid: user.PK,
    });
    let result = response.data ? response : response.error;
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
                <Action
                  submit
                  title="SUBMIT"
                  classes="bg-thin-blue w-48 h-10 mr-3 mb-10"
                  disabled={isSubmitting || isSuccess}
                />
                <Action
                  onClick={() => history.push(register.status)}
                  title="Back"
                  classes="bg-thin-blue w-48 h-10"
                  disabled={isSubmitting}
                />
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
