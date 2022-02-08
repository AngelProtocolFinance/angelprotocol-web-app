import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import * as Yup from "yup";
import {
  useAddCharityMetadataMutation,
  useGetCharityDataQuery,
} from "services/aws/charity";
import { toast } from "react-toastify";
import Action from "../../../components/ActionButton/Action";
import { registration } from "types/routes";
import { useHistory } from "react-router-dom";
import { useGetter, useSetter } from "store/accessors";
import { updateUserData } from "services/user/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const WalletSchema = Yup.object().shape({
  wallet_number: Yup.string().required("Please enter your wallet address."),
});

export type Values = {
  wallet_number: string;
};

const ConnectWallet = () => {
  const [isSuccess, setSuccess] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addCharityMetaProfile] = useAddCharityMetadataMutation();
  const user = useGetter((state) => state.user);
  const history = useHistory();
  const dispatch = useSetter();
  const { data } = useGetCharityDataQuery(user.PK);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(WalletSchema),
    defaultValues: {
      wallet_number: user.TerraWallet || data?.Metadata?.TerraWallet || "",
    },
  });

  const onConnectWallet = async (values: Values) => {
    setIsLoading(true);
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
    setIsLoading(false);
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
          <form
            className="text-center"
            onSubmit={handleSubmit(onConnectWallet)}
          >
            <div className="my-10 text-left relative max-w-xl mx-auto">
              {!isSuccess && (
                <p className="text-sm text-gray-400 font-bold mb-1">
                  Terra Wallet<span className="text-red-700">*</span>
                </p>
              )}
              <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                <input
                  {...register("wallet_number")}
                  type="text"
                  className="text-sm sm:text-base outline-none border-none w-full pr-3 bg-gray-200 text-black"
                  placeholder="Wallet Address"
                  disabled={isSuccess}
                />
              </div>
              <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
                {errors.wallet_number?.message}
              </p>
            </div>
            <Action
              submit
              title="SUBMIT"
              classes="bg-thin-blue w-48 h-10 mr-3 mb-10"
              disabled={isLoading || isSuccess}
              isLoading={isLoading}
            />
            <Action
              onClick={() => history.push(registration.status)}
              title="Back to dashboard"
              classes="bg-dark-grey w-48 h-10"
              disabled={isLoading}
            />
            {isSuccess && (
              <div>
                <p>Thanks for registering your wallet:</p>
                <p>your address is</p>
                <p className="font-bold">{walletAddress}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
