import KadoModal from "@giving/components/kado-modal";
import { useModalContext } from "@giving/contexts/modal-context";
import { DonationState } from "@giving/slices/donation";
import { useGetter } from "@giving/store";
import { useCallback } from "react";
import { ConfigParams } from "@giving/types/pages/widget";
import CurrentStep from "./CurrentStep";
import Progress from "./Progress";

type Props = { className?: string } & ConfigParams;

export default function Steps({ className = "", ...params }: Props) {
  const { showModal } = useModalContext();
  const state = useGetter((state) => state.donation);

  const handleOpenKado = useCallback(
    () => showModal(KadoModal, {}),
    [showModal]
  );

  return (
    <div className={`justify-self-center grid ${className}`}>
      {!isFinalized(state) && (
        <>
          <span className="text-center font-normal text-xs sm:text-sm">
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

      <CurrentStep {...params} />
    </div>
  );
}

function isFinalized(state: DonationState): boolean {
  return (
    state.step === 4 && (state.status === "error" || "hash" in state.status)
  );
}
