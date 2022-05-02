import Icon from "components/Icons/Icons";
import { useModalContext } from "components/ModalContext/ModalContext";
import useDonater from "components/Transactors/Donater/useDonater";
import useTransak from "hooks/useTransak";

export default function DonateSelection(props: { endowmentAddr: string }) {
  const { closeModal } = useModalContext();
  const { initTransak } = useTransak({ charityId: props.endowmentAddr });
  const showDonater = useDonater({
    to: "charity",
    receiver: props.endowmentAddr,
  });

  function showTransak() {
    closeModal();
    initTransak();
  }

  return (
    <div className="fixed-center z-20 grid justify-items-center gap-2 w-full max-w-md min-h-[10rem] bg-white rounded-md p-4 pb-6">
      <button
        onClick={closeModal}
        className="justify-self-end text-angel-grey hover:text-black"
      >
        <Icon type="Close" size={20} />
      </button>
      <h2 className="text-2xl text-angel-grey font-heading font-semibold">
        How do you want to donate?
      </h2>
      <Button
        className="bg-angel-blue hover:bg-bright-blue mt-4"
        onClick={showDonater}
      >
        <Icon type="Coins" size={20} />
        <span>Cryptocurrency</span>
      </Button>
      <Button
        className="bg-angel-grey hover:bg-angel-grey/90"
        onClick={showTransak}
      >
        <Icon type="MoneyBill" size={20} />
        <span>Fiat (USD, EUR, etc)</span>
      </Button>
    </div>
  );
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        "font-heading text-white font-semibold rounded-md flex items-center gap-3 w-full max-w-xs justify-center py-3 " +
        ` ${props.className || ""}`
      }
    />
  );
}
