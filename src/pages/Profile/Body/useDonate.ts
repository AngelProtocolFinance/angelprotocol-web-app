import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import useKYC from "components/KYC/useKYC";
import Popup from "components/Popup";
import { useProfileContext } from "../ProfileContext";

export default function useDonate() {
  const profile = useProfileContext();
  const { wallet } = useGetWallet();
  const showKYCForm = useKYC();
  const { showModal } = useModalContext();

  function donate() {
    if (!wallet) {
      showModal(Popup, {
        message: "You need to connect your wallet to make a donation",
      });
      return;
    }
    /** show kyc upfront, let KYC form show donater upon completion, 
            or user skip if kyc is not required */
    showKYCForm({
      type: "on-donation",
      donaterProps: {
        charityId: profile.id,
      },
      isKYCRequired: profile.kyc_donors_only,
      walletAddr: wallet.address,
    });
  }

  return donate;
}
