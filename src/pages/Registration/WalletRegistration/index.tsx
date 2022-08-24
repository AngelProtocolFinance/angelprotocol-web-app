import { useRegistrationState } from "services/aws/registration";
import { useWalletContext } from "contexts/Wallet";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import RegLoader from "../common/RegLoader";
import ChooseWallet from "./ChooseWallet";
import RegisteredWallet from "./RegisteredWallet";
import WalletSubmission from "./WalletSubmission";

export default function WalletRegistration() {
  const { data } = useRegistrationState("");
  const charity = data!; //
  const { info, isLoading } = useWalletContext();

  if (charity.Metadata.JunoWallet) {
    return <RegisteredWallet />;
  }

  if (isLoading) {
    return <RegLoader message="Wallet is loading" />;
  }

  if (!info) {
    return <ChooseWallet />;
  }

  return <WalletSubmission wallet={info} />;
}
