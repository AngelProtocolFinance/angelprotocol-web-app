import ExtLink from "components/ExtLink";
import { DappLogo } from "components/Image";
import LoaderRing from "components/LoaderRing";
import QueryLoader from "components/QueryLoader";
import { APP_NAME } from "constants/env";
import { PRIVACY_POLICY, TERMS_OF_USE_DONOR } from "constants/urls";
import { idParamToNum, setToLightMode } from "helpers";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useEndowment } from "services/aws/useEndowment";
import Content from "./Content";

//light mode by default
setToLightMode();

export default function DonateWidget() {
  const routeParams = useParams();
  const [searchParams] = useSearchParams();
  const endowId = idParamToNum(routeParams.id);
  const queryState = useEndowment({ id: endowId });

  /** Hide the Intercom chatbot */
  useEffect(() => {
    const w = window as any;
    if ("Intercom" in w) {
      w.Intercom("update", { hide_default_launcher: true });
      w.Intercom("hide");
    }
  }, []);

  return (
    <div className="grid grid-rows-[1fr_auto] justify-items-center gap-10">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: (
            <LoaderRing thickness={12} classes="w-28 place-self-center" />
          ),
          error: "Failed to get nonprofit info",
        }}
        classes={{ container: "grid place-items-center h-full w-full" }}
      >
        {(profile) => <Content profile={profile} searchParams={searchParams} />}
      </QueryLoader>
      <p className="max-md:border-t max-md:border-gray-l3 px-4 mb-5 col-start-1 text-sm leading-normal text-left text-navy-l1 dark:text-navy-l2">
        By making a donation to {APP_NAME}, you agree to our{" "}
        <A href={TERMS_OF_USE_DONOR}>Terms of Service</A>,{" "}
        <A href={PRIVACY_POLICY}>Privacy Policy</A>. 100% of your donation is
        tax-deductible to the extent allowed by US law. Your donation is made to{" "}
        {APP_NAME}, a tax-exempt US 501(c)(3) charity that grants unrestricted
        funds to this nonprofit on your behalf. As a legal matter, {APP_NAME}{" "}
        must provide any donations to this nonprofit on an unrestricted basis,
        regardless of any designations or restrictions made by you.{" "}
        <A href={TERMS_OF_USE_DONOR}>See Terms.</A>
      </p>
      <footer className="grid place-items-center h-20 w-full bg-blue dark:bg-blue-d3">
        <DappLogo classes="w-40" color="white" />
      </footer>
    </div>
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
