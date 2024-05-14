import character from "assets/images/waving-character.png";
import ExtLink from "components/ExtLink";
import { DappLogo } from "components/Image";
import Image from "components/Image/Image";
import { Steps } from "components/donation";
import { APP_NAME } from "constants/env";
import { PRIVACY_POLICY, TERMS_OF_USE_DONOR } from "constants/urls";
import { useGetter } from "store/accessors";

export default function Preview({ classes = "" }) {
  const { endowment, ...config } = useGetter((state) => state.widget);
  const endowName = endowment.name || "this nonprofit";

  return (
    <section className={`${classes} @container/preview pb-4`}>
      <span className="max-sm:hidden">
        <p className="flex text-navy-d4 text-2xl font-gochi text-nowrap">
          <Image src={character} className="h-[45px] mr-2 pb-2" />
          Check out the LIVE preview of your Donation Form!
        </p>
      </span>
      <div className="grid h-full overflow-y-auto scroller w-full max-h-[800px] border border-gray-l2 rounded text-navy-d4 bg-white">
        <div className="grow flex flex-col justify-between items-center pt-6 @xl/preview:pt-10">
          <h1 className="flex justify-center items-center gap-10 w-full h-24 z-20 text-lg @sm/preview:text-3xl">
            Donate to {endowName}
          </h1>
          {config.isDescriptionTextShown && (
            <p className="text-xs text-center @sm/preview:text-base">
              Check out the many crypto and fiat donation options. Provide your
              personal details to receive an immediate tax receipt.
            </p>
          )}
          <Steps
            className="my-5 @md/preview:w-3/4 border border-gray-l4"
            donaterConfig={{
              isPreview: true,
              splitDisabled: config.splitDisabled,
              liquidSplitPct: config.liquidSplitPct,
            }}
          />
          <p className="max-md:border-t max-md:border-gray-l3 px-4 mb-5 col-start-1 text-sm leading-normal text-left text-navy-l1 dark:text-navy-l2">
            By making a donation to {APP_NAME}, you agree to our{" "}
            <A href={TERMS_OF_USE_DONOR}>Terms of Service</A>,{" "}
            <A href={PRIVACY_POLICY}>Privacy Policy</A>. 100% of your donation
            is tax-deductible to the extent allowed by US law. Your donation is
            made to {APP_NAME}, a tax-exempt US 501(c)(3) charity that grants
            unrestricted funds to {endowName} on your behalf. As a legal matter,{" "}
            {APP_NAME} must provide any donations to {endowName} on an
            unrestricted basis, regardless of any designations or restrictions
            made by you. <A href={TERMS_OF_USE_DONOR}>See Terms.</A>
          </p>
          <footer className="mt-auto grid place-items-center h-20 w-full bg-blue">
            <DappLogo classes="w-40" color="white" />
          </footer>
        </div>
      </div>
    </section>
  );
}

const A: typeof ExtLink = ({ className, ...props }) => {
  return (
    <ExtLink
      {...props}
      className={className + " font-medium hover:underline"}
    />
  );
};
