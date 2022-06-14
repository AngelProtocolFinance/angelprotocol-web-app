import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Loader from "components/Loader";
import RegistrationSuccessful from "./RegistrationSuccessful";
import WalletSubmission from "./WalletSubmission";
import useRegisterWallet from "./useRegisterWallet";

export default function RegisterWallet() {
  const { wallet, isWalletLoading } = useGetWallet();
  const { isSuccess, isSubmitting, registerWallet } = useRegisterWallet();

  if (isWalletLoading) {
    return (
      <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
    );
  }

  return isSuccess ? (
    <RegistrationSuccessful walletAddress={wallet?.address!} />
  ) : (
    <WalletSubmission
      isSubmitting={isSubmitting}
      onClick={() => registerWallet(wallet?.address!)}
    />
  );
}
