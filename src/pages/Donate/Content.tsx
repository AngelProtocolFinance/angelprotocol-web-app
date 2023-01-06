import { useEffect } from "react";
import Breadcrumbs from "components/Breadcrumbs";
import { Steps } from "components/donation";
import { useGetter, useSetter } from "store/accessors";
import {
  DonationRecipient,
  DonationState,
  setRecipient,
} from "slices/donation";
import { appRoutes } from "constants/routes";

export default function Page(props: DonationRecipient) {
  const dispatch = useSetter();
  const state = useGetter((state) => state.donation);

  useEffect(() => {
    dispatch(setRecipient(props));
  }, [dispatch, props]);

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

      {isFinalized(state) && (
        <h3 className="text-center text-xl sm:text-3xl font-bold leading-snug mb-4">
          You're about to make a donation to {state.recipient?.name}
        </h3>
      )}
      <Steps />
    </div>
  );
}

function isFinalized(state: DonationState): boolean {
  return (
    state.step === 4 && (state.status === "error" || "hash" in state.status)
  );
}
