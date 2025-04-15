import { Link } from "@remix-run/react";
import dappLogo from "assets/images/bg-logo-503c.webp";
import ExtLink from "components/ext-link";
import { APP_NAME, INTERCOM_HELP } from "constants/env";
import { appRoutes } from "constants/routes";
import { guidestar } from "constants/urls";
import Newsletter from "./newsletter";
import Socials from "./socials";

type Props = { classes?: string };

export function Footer({ classes = "" }: Props) {
  return (
    <footer
      className={`grid ${classes} grid-cols-[1fr_auto_1fr] max-2xl:gap-x-0 2xl:grid-cols-[auto_auto_1fr] items-center px-10 gap-10`}
    >
      <div className="flex items-center gap-x-2 shrink-0 max-2xl:col-start-2">
        <img
          src={dappLogo}
          height={40}
          width={170}
          className="object-contain my-4"
          alt="logo"
        />
        <ExtLink href={guidestar.profile} className="shrink-0">
          <img src={guidestar.seal} width={100} height={100} />
        </ExtLink>
      </div>

      <div className="justify-self-center 2xl:justify-self-start order-3 2xl:order-2 max-2xl:col-span-full grid max-2xl:justify-items-center">
        <Socials classes="order-3 2xl:order-1 max-2xl:mt-4" />
        <div className="flex items-center max-2xl:justify-center flex-wrap my-2 order-2">
          <Link
            className="underline pr-2 text-gray 2xl:border-r border-gray"
            to={appRoutes.privacy_policy}
          >
            Privacy Policy
          </Link>
          <Link
            className="underline px-2 text-gray 2xl:border-r border-gray"
            to="#"
          >
            Security
          </Link>
          <Link
            className="underline px-2 text-gray @sm/links:text-nowrap order-5 @md/links:order-none "
            to={appRoutes.terms_donors}
          >
            Terms of Use (Donors)
          </Link>
          <Link
            className="underline px-2 text-gray 2xl:border-r border-gray"
            to={appRoutes.about}
          >
            About Us
          </Link>
          <a
            className="underline px-2 text-gray 2xl:border-r border-gray"
            href={INTERCOM_HELP}
          >
            FAQs
          </a>
          <Link
            className="underline px-2 text-gray 2xl:border-r border-gray @sm/links:text-nowrap"
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
    <p className={`text-[0.93rem] flex max-xl:flex-col text-gray ${classes}`}>
      <span>
        © Copyright {new Date().getFullYear()} {APP_NAME}
      </span>
      <span className="hidden 2xl:inline">,</span>{" "}
      <span>A Registered Charitable 501(c)(3) (EIN 87-3758939)</span>
    </p>
  );
}
