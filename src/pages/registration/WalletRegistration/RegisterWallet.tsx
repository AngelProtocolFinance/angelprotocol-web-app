import { yupResolver } from "@hookform/resolvers/yup";
import Input from "components/ContactDetailsForm/Input";
import LinkButton from "components/LinkButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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
        className="flex flex-col gap-10 items-center w-1/2"
        onSubmit={handleSubmit(onConnectWallet)}
      >
        <Input
          label="Terra Wallet"
          placeholder="terra1..."
          registerReturn={register("wallet_number")}
          errorMessage={errors.wallet_number?.message}
          disabled={isSubmitting || isSuccess}
          required
          errorClassName="mx-auto"
        />
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
    </div>
  );
}
