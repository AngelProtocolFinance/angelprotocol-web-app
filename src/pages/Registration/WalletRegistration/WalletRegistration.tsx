import { useRegistrationState } from "services/aws/registration";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import RegLoader from "../common/RegLoader";
import ChooseWallet from "./ChooseWallet";
import RegisteredWallet from "./RegisteredWallet";
import WalletSubmission from "./WalletSubmission";

export default function WalletRegistration() {
  const { data } = useRegistrationState("");
  const charity = data!; // ensured by step validation guard
  const { wallet, isLoading } = useGetWallet();

  if (charity.Metadata.JunoWallet) {
    return <RegisteredWallet />;
  }

  if (isLoading) {
    return <RegLoader message="Wallet is loading" />;
  }

  if (!wallet) {
    return <ChooseWallet />;
  }

  return <WalletSubmission />;
}
