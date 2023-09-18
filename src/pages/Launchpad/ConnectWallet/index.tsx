import { useGetWallet } from "contexts/WalletContext";
import { LoadingStatus } from "components/Status";
import { withStepGuard } from "../withStepGuard";
import ChooseWallet from "./ChooseWallet";
import WalletSubmission from "./WalletSubmission";

export default withStepGuard<7>(function ConnectWallet({ data }) {
  const { wallet, isLoading } = useGetWallet();

  if (isLoading) {
    return (
      <LoadingStatus classes="justify-center">Wallet is loading</LoadingStatus>
    );
  }

  if (!wallet) {
    return <ChooseWallet />;
  }

  return <WalletSubmission {...wallet} />;
});
