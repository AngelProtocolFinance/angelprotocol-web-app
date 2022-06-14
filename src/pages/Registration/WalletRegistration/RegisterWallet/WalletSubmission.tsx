import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { ProviderId } from "contexts/WalletContext/types";
import { WalletState } from "contexts/WalletContext/WalletContext";
import isTerraWallet from "contexts/WalletContext/helpers/isTerraProvider";
import FormInput from "components/FormInput";
import { appRoutes, siteRoutes } from "constants/routes";
import { Button } from "../../common";
import routes from "../../routes";

type Props = {
  wallet?: WalletState;
  isSubmitting: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function WalletSubmission(props: Props) {
  const { wallet, isSubmitting, onClick } = props;
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
        <UnsupportedWalletConnected />
      ) : (
        <>
          <p>
            If you wish to register another wallet, you need to Disconnect using
            the wallet logo located at the top right of your screen and resume
            the process with another wallet.
          </p>
          <div className="flex flex-col gap-10 items-center w-128">
            <FormInput
              id="walletAddress"
              label="Terra Wallet"
              placeholder="terra1..."
              value={wallet?.address}
              disabled
              required
            />
            <Button
              submit
              className="bg-thin-blue w-48 h-10"
              isLoading={isSubmitting}
              onClick={onClick}
            >
              Submit
            </Button>
          </div>
        </>
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

function UnsupportedWalletConnected() {
  return (
    <div className="flex flex-col gap-3">
      <p>Only Terra compatible wallets are allowed!</p>
      <p>Please connect your Terra wallet</p>
    </div>
  );
}

// function WalletNotConnected() {
//   return (
//     <p>
//       Please connect your Terra wallet using the "Connect" button in the
//       top-right of the page
//     </p>
//   );
// }
