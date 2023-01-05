import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import KadoModal from "components/KadoModal";
import { useGetter } from "store/accessors";
import { DonationState } from "slices/donation";
import CurrentStep from "./CurrentStep";
import Progress from "./Progress";

export function Steps() {
  const { showModal } = useModalContext();
  const state = useGetter((state) => state.donation);

  const handleOpenKado = useCallback(
    () => showModal(KadoModal, {}),
    [showModal]
  );

  return (
    <div className="justify-self-center grid">
      {!isFinalized(state) && (
        <>
          <h3 className="text-center text-3xl font-bold leading-snug mb-4">
            You're about to make a donation to {state.recipient?.name}
          </h3>
          <span className="text-center font-normal text-sm">
            Don't have crypto in your wallet?{" "}
            <button
              className="font-bold underline hover:text-orange transition ease-in-out duration-300"
              onClick={handleOpenKado}
            >
              Buy some to make your donation
            </button>
          </span>
          <Progress classes="my-12" />
        </>
      )}

      <CurrentStep />
    </div>
  );
}

function isFinalized(state: DonationState): boolean {
  return (
    state.step === 4 && (state.status === "error" || "hash" in state.status)
  );
}
