import { useRegistrationQuery } from "services/aws/registration";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import RegLoader from "../common/RegLoader";
import ChooseWallet from "./ChooseWallet";
import RegisteredWallet from "./RegisteredWallet";
import WalletSubmission from "./WalletSubmission";

export default function WalletRegistration() {
  const { charity } = useRegistrationQuery();
  const { wallet, isLoading } = useGetWallet();

  let content = <WalletSubmission />;
  if (charity.Metadata.JunoWallet) {
    content = <RegisteredWallet />;
  } else if (isLoading) {
    content = (
      <div className="flex items-center justify-center h-full">
        <RegLoader message="Wallet is loading" />
      </div>
    );
  } else if (!wallet) {
    content = <ChooseWallet />;
  }

  return (
    <div className="flex flex-col gap-5 w-full h-full items-center">
      {content}
    </div>
  );
}
