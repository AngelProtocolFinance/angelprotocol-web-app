import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Loader from "components/Loader";
import { useGetter } from "store/accessors";
import RegistrationSuccessful from "./RegistrationSuccessful";
import WalletSubmission from "./WalletSubmission";

export default function RegisterWallet() {
  const charity = useGetter((state) => state.charity);
  const { isWalletLoading } = useGetWallet();

  const registeredTerraWalletAddr = charity.Metadata.TerraWallet;

  if (isWalletLoading) {
    return (
      <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
    );
  }

  return registeredTerraWalletAddr !== "" ? (
    <RegistrationSuccessful registeredWalletAddr={registeredTerraWalletAddr} />
  ) : (
    <WalletSubmission />
  );
}
