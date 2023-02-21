import KadoModal from "@ap/components/kado-modal";
import { useModalContext } from "@ap/contexts";
import { DonationState, SliceState } from "@ap/slices/donation";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { ConfigParams } from "@ap/types/widget";
import CurrentStep from "./CurrentStep";
import Progress from "./Progress";

type Props = { className?: string } & ConfigParams;

export function Steps({ className = "", ...params }: Props) {
  const { showModal } = useModalContext();
  const state = useSelector((state: SliceState) => state.donation);

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
