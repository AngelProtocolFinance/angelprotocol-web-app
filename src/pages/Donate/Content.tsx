import ExtLink from "components/ExtLink";
import { Steps } from "components/donation";
import { APP_NAME } from "constants/env";
import { appRoutes } from "constants/routes";
import { TERMS_OF_USE_DONOR } from "constants/urls";
import { PropsWithChildren, memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { DonationRecipient, setRecipient } from "slices/donation";
import { useGetter, useSetter } from "store/accessors";
import FAQ from "./FAQ";
import OrgCard from "./OrgCard";

type Props = DonationRecipient & {
  logo: string;
  banner: string;
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
      className="max-sm:fixed max-sm:inset-0 overflow-y-auto grid md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] items-start content-start gap-x-6 w-full max-md:z-20 bg-white md:padded-container py-4 @sm:py-10 font-work"
      id={CONTAINER_ID}
    >
      <Link
        to={`${appRoutes.marketplace}/${props.id}`}
        className="hidden md:block max-md:px-4 col-span-full justify-self-end mb-4 font-semibold text-blue hover:text-blue-l1 active:text-blue-d1"
      >
        Cancel
      </Link>
      <OrgCard
        id={props.id}
        banner={props.banner}
        name={props.name}
        tagline={props.tagline}
        logo={props.logo}
        classes="mb-4 md:mb-0 md:col-start-1 md:w-64 xl:w-80 md:h-full lg:h-auto"
      />
      {/** small screen but space is still enough to render sidebar */}
      <div className="mx-0 md:contents min-[445px]:border min-[445px]:mx-4 rounded border-prim">
        <Steps
          className="md:border border-prim col-start-1 md:col-start-2 md:row-start-2 md:row-span-2 lg:row-span-1"
          donaterConfig={null}
        />
      </div>

      <FAQ classes="max-md:px-4 mt-4 col-start-1 md:row-start-3 md:row-span-4 md:col-start-1 md:w-64 xl:w-80 lg:row-start-2 lg:col-start-3 lg:mt-0 " />

      <p className="max-md:px-4 mt-4 text-xs leading-normal text-left text-gray-d1 dark:text-gray col-start-1 md:col-start-2 md:row-start-4 lg:row-start-3">
        By making a donation to {APP_NAME}, you agree to our{" "}
        <Bold>Terms of Service</Bold>, <Bold>Privacy Policy</Bold>, and{" "}
        <Bold>Nonprofit Support Fee</Bold>. 100% of your donation is
        tax-deductible to the extent allowed by US law. Your donation is made to{" "}
        {APP_NAME}, a tax-exempt US 501(c)(3) charity that grants unrestricted
        funds to {props.name} on your behalf. As a legal matter, {APP_NAME} must
        provide any donations to {props.name} on an unrestricted basis,
        regardless of any designations or restrictions made by you.{" "}
        <ExtLink
          className="hover:underline font-medium"
          href={TERMS_OF_USE_DONOR}
        >
          See Terms.
        </ExtLink>
      </p>
      <p className="max-md:px-4 mt-4 text-xs leading-normal text-left text-gray-d1 dark:text-gray col-start-1 md:col-start-2 md:row-start-5 lg:row-start-4">
        <span className="block mb-0.5">
          Need help? See FAQs or contact us at our <Bold>Help Center</Bold>.
        </span>
        <span className="block mb-0.5">
          Have ideas for how we can build a better donation experience?{" "}
          <Bold>Send us feedback</Bold>.
        </span>
        <span className="block">
          We respect your privacy. To learn more, check out our{" "}
          <Bold>Privacy Policy</Bold>.
        </span>
      </p>
    </div>
  );
}

//memoize to prevent useEffect ( based on props ) from running when parent re-renders with the same props
export default memo(Content);

function Bold(props: PropsWithChildren) {
  return <span className="font-medium">{props.children}</span>;
}
