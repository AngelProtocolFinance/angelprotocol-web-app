import { yupResolver } from "@hookform/resolvers/yup";
import Action from "components/ActionButton/Action";
import Input from "components/ContactDetailsForm/Input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useAddCharityMetadataMutation,
  useGetCharityDataQuery,
} from "services/aws/charity";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import * as Yup from "yup";
import NavigationToDashboard from "./NavigationToDashboard";
import Title from "./Title";

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
      <Title isSuccess={isSuccess} />
      <RegistrationExplanation />
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
      <NavigationToDashboard
        isSuccess={isSuccess}
        walletAddress={walletAddress}
      />
    </div>
  );
}

function RegistrationExplanation() {
  return (
    <p className="my-10">
      ### EXPLANATION ABOUT WHAT REGISTERING THE WALLET DOES ###
    </p>
  );
}
