import { useCallback, useEffect } from "react";
import { useModalContext } from "contexts/ModalContext";
import Breadcrumbs from "components/Breadcrumbs";
import KadoModal from "components/KadoModal";
import { Steps } from "components/donation";
import { useGetter, useSetter } from "store/accessors";
import {
  DonationRecipient,
  DonationState,
  setRecipient,
} from "slices/donation";
import { appRoutes } from "constants/routes";

export default function Page(props: DonationRecipient) {
  const { showModal } = useModalContext();
  const dispatch = useSetter();
  const state = useGetter((state) => state.donation);

  useEffect(() => {
    dispatch(setRecipient(props));
  }, [dispatch, props]);

  const handleOpenKado = useCallback(
    () => showModal(KadoModal, {}),
    [showModal]
  );

  return (
    <div className="justify-self-center grid padded-container max-w-[35rem] py-8 sm:py-20">
      <Breadcrumbs
        className="font-body font-normal text-sm justify-self-start sm:justify-self-auto mb-10 sm:mb-12"
        items={[
          { title: "Marketplace", to: appRoutes.marketplace },
          {
            title: props.name,
            to: `${appRoutes.profile}/${props.id}`,
          },
          {
            title: "Donate",
            to: `${appRoutes.donate}/${props.id}`,
          },
        ]}
      />

      {isHeadingShown(state) && (
        <>
          <h3 className="text-center text-3xl font-bold leading-snug mb-4">
            You're about to make a donation to {props.name}
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
        </>
      )}

      <Steps />
    </div>
  );
}

function isHeadingShown(state: DonationState): boolean {
  return (
    state.step !== 4 || (state.status !== "error" && !("hash" in state.status))
  );
}
