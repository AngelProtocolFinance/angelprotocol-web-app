import dappLogo from "assets/images/bg-logo-503c.png";
import ExtLink from "components/ExtLink";
import { APP_NAME, INTERCOM_HELP } from "constants/env";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import Newsletter from "../common/Newsletter";
import Socials from "../common/Socials";

type Props = { classes?: string };

export function Footer({ classes = "" }: Props) {
  return (
    <footer className={`grid ${classes}`}>
      <div className="grid xl:grid-cols-3 justify-items-center items-center gap-8 mb-8 px-10">
        <div className="flex items-center gap-x-6 xl:justify-self-start">
          <img
            src={dappLogo}
            height={40}
            width={170}
            className="object-contain my-4"
            alt="logo"
          />
          <ExtLink
            href="https://www.guidestar.org/profile/shared/5f73977b-cb21-4973-852e-cdfa5c6ee7a5"
            className="shrink-0"
          >
            <img
              src="https://widgets.guidestar.org/TransparencySeal/10103678"
              width={100}
              height={100}
            />
          </ExtLink>
        </div>

        <div className="xl:@container/links xl:w-full justify-self-center">
          <div className="grid grid-cols-2 @md/links:grid-cols-[auto_auto_auto] content-center gap-4 w-full @md:pl-20 xl:pl-0">
            <Link
              className="underline text-navy-l1"
              to={appRoutes.privacy_policy}
            >
              Privacy Policy
            </Link>
            <Link className="underline text-navy-l1" to="#">
              Security
            </Link>
            <Link
              className="underline text-navy-l1 @sm/links:text-nowrap order-5 @md/links:order-none "
              to={appRoutes.terms_donors}
            >
              Terms of Use (Donors)
            </Link>
            <Link className="underline text-navy-l1" to={appRoutes.about}>
              About Us
            </Link>
            <a className="underline text-navy-l1" href={INTERCOM_HELP}>
              FAQs
            </a>
            <Link
              className="underline text-navy-l1 @sm/links:text-nowrap"
              to={appRoutes.terms_nonprofits}
            >
              Terms of Use (Nonprofits)
            </Link>
          </div>
        </div>

        <Newsletter classes="max-xl:mt-6" />
      </div>

      <Copyright classes="xl:hidden flex flex-col mb-4" />
      <div className="bg-[#F1FAFF] flex justify-center xl:justify-between p-4">
        <Copyright classes="max-xl:hidden" />
        <Socials />
      </div>
    </footer>
  );
}

function Copyright({ classes = "" }) {
  return (
    <p className={`text-[0.93rem] text-center ${classes}`}>
      <span>
        © Copyright {new Date().getFullYear()} {APP_NAME}
      </span>
      <span className="hidden xl:inline">,</span>{" "}
      <span>A Registered Charitable 501(c)(3) (EIN 87-3758939)</span>
    </p>
  );
}
