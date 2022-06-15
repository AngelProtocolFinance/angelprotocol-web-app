import { useNavigate } from "react-router-dom";
import {
  useGetWallet,
  useSetWallet,
} from "contexts/WalletContext/WalletContext";
import isTerraWallet from "contexts/WalletContext/helpers/isTerraProvider";
import FormInput from "components/FormInput";
import { appRoutes, siteRoutes } from "constants/routes";
import { Button } from "../common";
import routes from "../routes";
import useRegisterWallet from "./useRegisterWallet";

export default function WalletSubmission() {
  const { wallet } = useGetWallet();
  const { disconnect } = useSetWallet();
  const { isSubmitting, registerWallet } = useRegisterWallet();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full items-center gap-10 justify-center">
      <p className="text-3xl font-bold">Register your wallet</p>
      <p>
        Once you have connected the terra wallet of your choice, we shall be
        able to create your Angel Protocol endowment account using that wallet
        address. We recommend using a new wallet.
      </p>
      {wallet && !isTerraWallet(wallet.providerId) ? (
        <div className="text-center bg-angel-orange/20 border border-2 border-angel-orange/80 rounded-md p-4 ">
          <p>
            <span className="text-sm font-bold">connected wallet: </span>
            <span className="font-extrabold uppercase">
              {wallet.providerId.toLocaleUpperCase()}
            </span>
          </p>
          <p>Only Terra compatible wallets are allowed!</p>
          <Button
            className="text-sm uppercase text-angel-orange hover:text-orange px-2 py-1 mt-2"
            disabled={isSubmitting}
            onClick={disconnect}
          >
            Select Terra Wallet
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center w-128">
          <FormInput
            mono
            id="walletAddress"
            label="Terra wallet address"
            placeholder="terra1..."
            value={wallet?.address}
            disabled
            required
          />

          <Button
            submit
            className="bg-thin-blue w-48 h-10"
            isLoading={isSubmitting}
            onClick={() => registerWallet(wallet?.address!)}
          >
            Submit
          </Button>
          <Button
            className="text-sm uppercase hover:text-angel-orange px-2 py-1"
            disabled={isSubmitting}
            onClick={disconnect}
          >
            Select other wallet
          </Button>
        </div>
      )}
      <Button
        className="bg-green-400 w-80 h-10"
        disabled={isSubmitting}
        onClick={() =>
          navigate(
            `${siteRoutes.app}/${appRoutes.register}/${routes.dashboard}`
          )
        }
      >
        Back to registration dashboard
      </Button>
    </div>
  );
}
