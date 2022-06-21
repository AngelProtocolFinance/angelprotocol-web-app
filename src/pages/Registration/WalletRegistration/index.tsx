import { useRegistrationState } from "services/aws/registration";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import RegLoader from "../common/RegLoader";
import ChooseWallet from "./ChooseWallet";
import RegisteredWallet from "./RegisteredWallet";
import WalletSubmission from "./WalletSubmission";

export default function WalletRegistration() {
  const { data } = useRegistrationState("");
  const charity = data!; //
  const { wallet, isProviderLoading } = useGetWallet();

  if (charity.Metadata.TerraWallet) {
    return <RegisteredWallet />;
  }

  if (isProviderLoading) {
    return <RegLoader message="Wallet is loading" />;
  }

  if (!wallet) {
    return <ChooseWallet />;
  }

  return <WalletSubmission />;
}
