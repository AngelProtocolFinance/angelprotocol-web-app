import { useParams } from "react-router-dom";
import { CharityParams } from "../types";
import { Profile } from "types/server/contracts";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import { unsdgs } from "constants/unsdgs";
import CharityLinks from "./CharityLinks";
import DonateSelection from "./DonateSelection";

export default function CharityHeader(props: Profile) {
  const { address: endowment_addr } = useParams<CharityParams>();
  const { wallet, isWalletLoading } = useGetWallet();
  const { showModal } = useModalContext();

  function showDonateSelection() {
    if (!isWalletLoading && !wallet) {
      showModal(Popup, { message: "Please connect your wallet" });
    } else {
      showModal(DonateSelection, { endowmentAddr: endowment_addr! });
    }
  }

  const sdg = unsdgs[props.un_sdg || 0];

  return (
    <div className="flex flex-col items-start gap-2">
      {props.un_sdg && (
        <p
          className={`p-3 max-w-250 text-center bg-angel-blue/50 text-white text-sm uppercase font-heading font-bold rounded-xl`}
        >
          SDG #{props.un_sdg}: {sdg?.title}
        </p>
      )}

      <h3 className="text-3xl font-bold text-white uppercase">{props.name}</h3>

      <div className="flex items-center gap-2 flex-wrap">
        <Button onClick={showDonateSelection}>DONATE NOW</Button>

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
