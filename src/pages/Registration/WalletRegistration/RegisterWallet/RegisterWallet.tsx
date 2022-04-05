import { WalletStatus } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import { app, site } from "constants/routes";
import useWalletContext from "hooks/useWalletContext";
import routes from "pages/Registration/routes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationSuccessful from "./RegistrationSuccessful";
import useRegisterWallet from "./useRegisterWallet";
import WalletSubmission from "./WalletSubmission";

export default function RegisterWallet() {
  const [walletAddress, setWalletAddress] = useState("");
  const { isSuccess, isSubmitting, registerWallet } = useRegisterWallet();
  const { status, wallet } = useWalletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === WalletStatus.WALLET_CONNECTED) {
      setWalletAddress(wallet!.address);
    } else if (status === WalletStatus.WALLET_NOT_CONNECTED) {
      navigate(`${site.app}/${app.register}/${routes.wallet}`);
    }
  }, [status, wallet, navigate]);

  if (status === WalletStatus.INITIALIZING) {
    return (
      <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
    );
  }

  return isSuccess ? (
    <RegistrationSuccessful walletAddress={walletAddress} />
  ) : (
    <WalletSubmission
      walletAddress={walletAddress}
      isSubmitting={isSubmitting}
      onClick={() => registerWallet(walletAddress)}
    />
  );
}
