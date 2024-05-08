import ExtLink from "components/ExtLink";
import { DappLogo } from "components/Image";
import { type DonationRecipient, Steps } from "components/donation";
import { APP_NAME, INTERCOM_HELP } from "constants/env";
import { appRoutes } from "constants/routes";
import { PRIVACY_POLICY, TERMS_OF_USE_DONOR } from "constants/urls";
import { memo } from "react";
import { Link } from "react-router-dom";

import type { DonationRecord } from "types/aws";
import FAQ from "./FAQ";
import OrgCard from "./OrgCard";

type Props = DonationRecipient & {
  logo: string;
  banner: string;
  tagline?: string;
  intent?: DonationRecord;
};

function Content(props: Props) {
  return (
    <div className="fixed inset-0 overflow-y-auto w-full z-50 bg-[#F6F7F8]">
      <div className="bg-white h-[3.6875rem] w-full flex items-center justify-between px-10 mb-4">
        <DappLogo classes="h-[2.036rem]" />
        <Link
          to={`${appRoutes.marketplace}/${props.id}`}
          className="font-semibold font-heading hover:text-blue-d1"
        >
          Cancel
        </Link>
      </div>
      <div className="md:px-4 max-w-[68.625rem] mx-auto grid md:grid-cols-[1fr_auto] items-start content-start gap-4">
        <OrgCard
          name={props.name}
          tagline={props.tagline}
          logo={props.logo}
          classes="col-start-1 row-start-1"
        />
        {/** small screen but space is still enough to render sidebar */}
        <div className="mx-0 border-b md:contents min-[445px]:border min-[445px]:mx-4 rounded-lg border-gray-l4">
          <Steps
            recipient={{
              hide_bg_tip: props.hide_bg_tip,
              id: props.id,
              name: props.name,
            }}
            className="md:border border-gray-l4 rounded-lg row-start-2"
          />
        </div>
        <FAQ classes="max-md:px-4 md:col-start-2 md:row-span-5 md:w-[18.875rem]" />
        <p className="max-md:border-t max-md:border-gray-l3 max-md:px-4 max-md:pt-4 col-start-1 text-sm leading-normal text-left text-navy-l1 dark:text-navy-l2">
          By making a donation to {APP_NAME}, you agree to our{" "}
          <A href={TERMS_OF_USE_DONOR}>Terms of Service</A>,{" "}
          <A href={PRIVACY_POLICY}>Privacy Policy</A>. 100% of your donation is
          tax-deductible to the extent allowed by US law. Your donation is made
          to {APP_NAME}, a tax-exempt US 501(c)(3) charity that grants
          unrestricted funds to {props.name} on your behalf. As a legal matter,{" "}
          {APP_NAME} must provide any donations to {props.name} on an
          unrestricted basis, regardless of any designations or restrictions
          made by you. <A href={TERMS_OF_USE_DONOR}>See Terms.</A>
        </p>
        <p className="max-md:px-4 mb-4 max-mbcol-start-1 text-sm leading-normal text-left text-navy-l1 dark:text-navy-l2">
          <span className="block mb-0.5">
            Need help? See{" "}
            <Link to="./#faqs" className="hover:underline font-medium">
              FAQs
            </Link>{" "}
            or contact us at our <A href={INTERCOM_HELP}>Help Center</A>.
          </span>
          <span className="block mb-0.5">
            Have ideas for how we can build a better donation experience?{" "}
            <A href={INTERCOM_HELP}>Send us feedback</A>.
          </span>
          <span className="block">
            We respect your privacy. To learn more, check out our{" "}
            <A href={PRIVACY_POLICY}>Privacy Policy</A>.
          </span>
        </p>
      </div>
    </div>
  );
}

//memoize to prevent useEffect ( based on props ) from running when parent re-renders with the same props
export default memo(Content);

const A: typeof ExtLink = ({ className, ...props }) => {
  return (
    <ExtLink
      {...props}
      className={className + " font-medium hover:underline"}
    />
  );
};
