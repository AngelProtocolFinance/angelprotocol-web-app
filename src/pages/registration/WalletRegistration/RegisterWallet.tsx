import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { Link, LinkProps } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  useAddCharityMetadataMutation,
  useGetCharityDataQuery,
} from "services/aws/charity";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import { app, registration, site } from "types/routes";
import * as Yup from "yup";
import Action from "../../../components/ActionButton/Action";

export const WalletSchema = Yup.object().shape({
  wallet_number: Yup.string().required("Please enter your wallet address."),
});

export type Values = {
  wallet_number: string;
};

export default function RegisterWallet() {
  const [isSuccess, setSuccess] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [addCharityMetaProfile] = useAddCharityMetadataMutation();
  const user = useGetter((state) => state.user);
  const connectedWalletAddress = useGetter(
    (state) => state.registration.connectedWalletAddress
  );
  const dispatch = useSetter();
  const { data } = useGetCharityDataQuery(user.PK);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(WalletSchema),
    defaultValues: {
      wallet_number:
        connectedWalletAddress ||
        user.TerraWallet ||
        data?.Metadata?.TerraWallet ||
        "",
    },
  });

  const onConnectWallet = async (values: Values) => {
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
        toast.success("Your wallet address was saved successfully.");
        setSuccess(true);
        dispatch(
          updateUserData({
            ...user,
            TerraWallet: values.wallet_number,
          })
        );
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...user,
            TerraWallet: values.wallet_number,
          })
        );
        setWalletAddress(values.wallet_number);
      }
    }
  };

  return (
    <div className="flex flex-col h-full items-center">
      {isSuccess ? (
        <div className="text-center items-center">
          <div className="flex justify-center mb-5">
            <FaCheck className="text-3xl text-white" />
          </div>
          <p className="text-3xl font-bold uppercase">success!</p>
        </div>
      ) : (
        <p className="text-3xl font-bold">Register your wallet</p>
      )}
      <p className="my-10">
        ### EXPLANATION ABOUT WHAT REGISTERING THE WALLET DOES ###
      </p>
      <form
        className="flex flex-col gap-3 items-center w-1/2"
        onSubmit={handleSubmit(onConnectWallet)}
      >
        {!isSuccess && (
          <p className="text-sm text-gray-400 font-bold">
            Terra Wallet<span className="text-red-700">*</span>
          </p>
        )}
        <input
          {...register("wallet_number")}
          type="text"
          className="text-sm sm:text-base outline-none border-none w-full bg-gray-200 text-black rounded-md p-2 flex items-center"
          placeholder="Wallet Address"
          disabled={isSuccess}
        />
        <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
          {errors.wallet_number?.message}
        </p>
        <Action
          submit
          title="Submit"
          classes="bg-thin-blue w-48 h-10 mb-10"
          disabled={isSubmitting || isSuccess}
          isLoading={isSubmitting}
        />
      </form>
      {!isSuccess ? (
        <Link
          to={`${site.app}/${app.register}/${registration.status}`}
          className="uppercase text-bright-blue text-sm hover:underline"
        >
          Click here to go back to the registration dashboard
        </Link>
      ) : (
        <>
          <div>
            <p>Thanks for registering your wallet:</p>
            <p>your address is</p>
            <p className="font-bold">{walletAddress}</p>
          </div>
          <LinkButton
            to={`${site.app}/${app.register}/${registration.status}`}
            className="w-60 h-10 mt-8"
            bgColorClass="bg-angel-blue"
          >
            Back to dashboard
          </LinkButton>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

type ButtonLink = LinkProps & {
  disabled?: boolean;
  bgColorClass: string;
};
function LinkButton(props: ButtonLink) {
  const { disabled, className, bgColorClass, ...rest } = props;
  return (
    <Link
      className={`rounded-xl uppercase font-bold text-white flex justify-center items-center ${className} ${
        disabled ? "bg-gray-300 cursor-default" : bgColorClass
      }`}
      {...rest}
    />
  );
}
