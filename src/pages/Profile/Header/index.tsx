import { ProfileResponse } from "types/contracts";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import useKYC from "components/KYC/useKYC";
import Popup from "components/Popup";
import { unsdgs } from "constants/unsdgs";
import { useProfile } from "..";
import CharityLinks from "./Links";

export default function CharityHeader(props: ProfileResponse) {
  const { wallet } = useGetWallet();
  const profile = useProfile();

  const showKYCForm = useKYC();
  const { showModal } = useModalContext();
  //TODO: show multiple SDGs
  const sdgNum = props.categories.sdgs[0] || 1;
  const sdg = unsdgs[sdgNum];

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
        charityName: profile.name,
      },
      isKYCRequired: profile.kyc_donors_only,
      walletAddr: wallet.address,
    });
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {sdgNum && (
        <p className="p-3 max-w-[250px] text-center bg-angel-blue/50 text-white text-sm uppercase font-heading font-bold rounded-xl">
          SDG #{sdgNum}: {sdg?.title}
        </p>
      )}

      <h3 className="text-3xl font-bold text-white uppercase">{props.name}</h3>

      <div className="flex items-center gap-2 flex-wrap">
        <Button onClick={donate}>DONATE NOW</Button>

        <CharityLinks />
      </div>
    </div>
  );
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="disabled:bg-grey-accent uppercase bg-orange hover:bg-angel-orange font-heading text-white font-semibold rounded-xl px-6 py-3"
      {...props}
    />
  );
}
