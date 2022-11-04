import { useState } from "react";
import { useRegistrationQuery } from "services/aws/registration";
import { useGetWallet } from "contexts/WalletContext";
import RegLoader from "../common/RegLoader";
import ChooseWallet from "./ChooseWallet";
import RegisteredWallet from "./RegisteredWallet";
import WalletSubmission from "./WalletSubmission";

export default function WalletRegistration() {
  const { application } = useRegistrationQuery();
  const { wallet, isLoading } = useGetWallet();
  const [submittedWallet, setSubmittedWallet] = useState(
    application.Metadata.JunoWallet
  );

  let content = <WalletSubmission />;

  if (submittedWallet) {
    content = <RegisteredWallet onChange={() => setSubmittedWallet("")} />;
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
