import ExtLink from "components/ExtLink";
import { Steps } from "components/donation";
import { appRoutes } from "constants/routes";
import { TERMS_OF_USE_DONOR } from "constants/urls";
import { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { DonationRecipient, setRecipient } from "slices/donation";
import { useGetter, useSetter } from "store/accessors";
import FAQ from "./FAQ";
import OrgCard from "./OrgCard";

type Props = DonationRecipient & {
  logo: string;
  tagline: string;
};

function Content(props: Props) {
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
      className="grid grid-cols-[auto_1fr_auto] items-start content-start gap-x-6 w-full padded-container py-4 @sm:py-10 font-work"
      id={CONTAINER_ID}
    >
      <Link
        to={`${appRoutes.marketplace}/${props.id}`}
        className="col-span-full justify-self-end mb-4 font-semibold text-blue hover:text-blue-l1 active:text-blue-d1"
      >
        Cancel
      </Link>
      <OrgCard name={props.name} tagline={props.tagline} logo={props.logo} />
      <Steps className="justify-self-center w-full" donaterConfig={null} />
      <FAQ />

      <p className="text-sm text-gray-d1 dark:text-gray mt-2 text-center col-span-full">
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

//memoize to prevent useEffect ( based on props ) from running when parent re-renders with the same props
export default memo(Content);
