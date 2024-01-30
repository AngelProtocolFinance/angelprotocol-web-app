import Breadcrumbs from "components/Breadcrumbs";
import ExtLink from "components/ExtLink";
import { Steps } from "components/donation";
import { appRoutes } from "constants/routes";
import { TERMS_OF_USE_DONOR } from "constants/urls";
import { memo, useEffect, useRef } from "react";
import {
  DonationRecipient,
  DonationState,
  setRecipient,
} from "slices/donation";
import { useGetter, useSetter } from "store/accessors";

function Content(props: DonationRecipient) {
  const dispatch = useSetter();
  const state = useGetter((state) => state.donation);
  useEffect(() => {
    dispatch(setRecipient(props));
  }, [dispatch, props]);

  const CONTAINER_ID = "__container_id";
  const prevStep = useRef(state.step);
  useEffect(() => {
    /** at first visit, equal so no scrolling happens
     * on next or back, would be different
     */
    if (state.step === prevStep.current) return;
    const element = document.getElementById(CONTAINER_ID);
    element?.scrollIntoView();
    prevStep.current = state.step;
  }, [state.step]);

  return (
    <div
      className="justify-self-center grid w-full sm:w-[35rem] py-4 @sm:py-10"
      id={CONTAINER_ID}
    >
      <Breadcrumbs
        className="font-normal text-sm justify-self-start sm:justify-self-auto mb-6"
        items={[
          { title: "Marketplace", to: `${appRoutes.marketplace}/` },
          {
            title: props.name,
            to: `${appRoutes.marketplace}/${props.id}`,
          },
          {
            title: "Donate",
            to: `${appRoutes.donate}/${props.id}`,
          },
        ]}
      />

      {!isFinalized(state) && (
        <h3 className="sm:text-center text-xl sm:text-3xl leading-snug mb-4">
          {state.recipient?.name}
        </h3>
      )}

      <Steps className="justify-self-center" donaterConfig={null} />

      <p className="text-sm text-gray-d1 dark:text-gray mt-2 text-center">
        By making a donation, you agree to our{" "}
        <ExtLink
          className="hover:underline text-gray-d2 "
          href={TERMS_OF_USE_DONOR}
        >
          Terms & Conditions
        </ExtLink>
      </p>
    </div>
  );
}

function isFinalized(state: DonationState): boolean {
  return (
    state.step === "tx" && (state.status === "error" || "hash" in state.status)
  );
}

//memoize to prevent useEffect ( based on props ) from running when parent re-renders with the same props
export default memo(Content);
