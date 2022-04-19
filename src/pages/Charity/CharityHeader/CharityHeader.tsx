import { Profile } from "services/aws/endowments/types";
import { useSetModal } from "components/Modal/Modal";
import useDonater from "components/Transactors/Donater/useDonater";
import useTransak from "hooks/useTransak";
import { unsdgs } from "constants/unsdgs";
import CharityLinks from "./CharityLinks";

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
        <Button disabled={props.is_placeholder} onClick={showDonateSelection}>
          DONATE NOW
        </Button>
        <CharityLinks />
      </div>
    </div>
  );
}

function DonateSelection(props: { endowmentAddr: string }) {
  const { hideModal } = useSetModal();
  const { initTransak } = useTransak();
  const showDonater = useDonater({
    to: "charity",
    receiver: props.endowmentAddr,
  });

  function showTransak() {
    hideModal();
    initTransak();
  }

  return (
    <div className="grid justify-items-center gap-4 w-full max-w-md min-h-[10rem] bg-white rounded-md p-4">
      <h2 className="text-xl font-heading font-semibold">
        How do you want to donate?
      </h2>
      <Button onClick={showDonater}>Cryptocurrency</Button>
      <Button onClick={showTransak}>Fiat (USD, EUR, etc)</Button>
    </div>
  );
}

const buttonStyle =
  "disabled:bg-grey-accent uppercase bg-orange hover:bg-angel-orange font-heading text-white font-semibold rounded-xl px-6 py-3";

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={buttonStyle} />;
}
