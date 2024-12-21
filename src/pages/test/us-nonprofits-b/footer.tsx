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
    <footer
      className={`grid ${classes} grid-cols-[3fr_auto_1fr] lg:grid-cols-[2fr_auto_1fr] 2xl:grid-cols-[auto_auto_1fr] items-center px-10 gap-10`}
    >
      <div className="flex items-center gap-x-2 shrink-0 max-2xl:col-start-2">
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

      <div className="justify-self-start order-3 2xl:order-2 max-2xl:col-start-2 grid max-2xl:justify-items-center">
        <Socials classes="order-3 2xl:order-1 max-2xl:mt-4" />
        <div className="flex items-center max-2xl:justify-center flex-wrap 2xl:divide-x divide-navy-l1 my-2 order-2">
          <Link
            className="underline pr-2 text-navy-l1"
            to={appRoutes.privacy_policy}
          >
            Privacy Policy
          </Link>
          <Link className="underline px-2 text-navy-l1" to="#">
            Security
          </Link>
          <Link
            className="underline px-2 text-navy-l1 @sm/links:text-nowrap order-5 @md/links:order-none "
            to={appRoutes.terms_donors}
          >
            Terms of Use (Donors)
          </Link>
          <Link className="underline px-2 text-navy-l1" to={appRoutes.about}>
            About Us
          </Link>
          <a className="underline px-2 text-navy-l1" href={INTERCOM_HELP}>
            FAQs
          </a>
          <Link
            className="underline px-2 text-navy-l1 @sm/links:text-nowrap"
            to={appRoutes.terms_nonprofits}
          >
            Terms of Use (Nonprofits)
          </Link>
        </div>
        <Copyright classes="order-1 2xl:order-3 max-2xl:text-center" />
      </div>

      <Newsletter classes="2xl:justify-self-end 2xl:order-3 order-2 max-2xl:col-start-2" />
    </footer>
  );
}

function Copyright({ classes = "" }) {
  return (
    <p className={`text-[0.93rem] text-navy-l1 ${classes}`}>
      <span>
        © Copyright {new Date().getFullYear()} {APP_NAME}
      </span>
      <span className="hidden xl:inline">,</span>{" "}
      <span>A Registered Charitable 501(c)(3) (EIN 87-3758939)</span>
    </p>
  );
}
