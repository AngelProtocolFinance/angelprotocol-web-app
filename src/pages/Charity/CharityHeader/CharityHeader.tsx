import { Profile } from "services/aws/endowments/types";
import { useSetModal } from "components/Modal/Modal";
import { unsdgs } from "constants/unsdgs";
import CharityLinks from "./CharityLinks";
import DonateSelection from "./DonateSelection";

export default function CharityHeader(props: Profile) {
  const { showModal } = useSetModal();
  function showDonateSelection() {
    showModal(DonateSelection, { endowmentAddr: props.endowment_address! });
  }

  const sdg = unsdgs[+props.un_sdg];

  return (
    <div className="flex flex-col items-start gap-2">
      {props.un_sdg && (
        <p
          className={`p-3 max-w-250 text-center bg-angel-blue/50 text-white text-sm uppercase font-heading font-bold rounded-xl`}
        >
          SDG #{props.un_sdg}: {sdg?.title}
        </p>
      )}

      <h3 className="text-3xl font-bold text-white uppercase">
        {props.charity_name}
      </h3>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          className="disabled:bg-grey-accent bg-orange hover:bg-angel-orange font-heading text-white font-semibold rounded-xl px-6 py-3"
          disabled={props.is_placeholder}
          onClick={showDonateSelection}
        >
          DONATE NOW
        </button>
        <CharityLinks />
      </div>
    </div>
  );
}
