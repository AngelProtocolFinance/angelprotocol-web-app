import { useRegistrationState } from "services/aws/registration";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
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
    return <div>loading</div>;
  }

  if (!wallet) {
    return <ChooseWallet />;
  }

  return <WalletSubmission />;
  // return (
  //   <Routes>
  //     <Route index element={<ChooseWallet />} />
  //     <Route path={routes.submit} element={<RegisterWallet />} />
  //   </Routes>
  // );
}
