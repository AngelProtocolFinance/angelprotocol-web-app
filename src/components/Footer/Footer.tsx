import { Link } from "@remix-run/react";
import dappLogo from "assets/images/bg-logo-503c.webp";
import { APP_NAME, INTERCOM_HELP } from "constants/env";
import { appRoutes } from "constants/routes";
import type { ReactNode } from "react";
import ExtLink from "../ExtLink";
import Newsletter from "./Newsletter";
import Socials from "./Socials";

type Props = { classes?: string };

function Footer({ classes = "" }: Props) {
  function ref(node: HTMLElement | null) {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        const intercom = document.querySelector(".intercom-launcher");
        intercom?.classList.toggle("hidden", e.isIntersecting);
      },
      { threshold: [0.5] }
    );
    observer.observe(node);
  }
  return (
    <footer
      ref={ref}
      className={`grid grid-cols-[auto_auto] xl:grid-cols-[repeat(5,auto)] border-t border-gray-l4 ${classes}`}
    >
      <div className="grid grid-cols-subgrid grid-rows-subgrid col-span-2 row-span-3 xl:col-span-5 xl:gap-10 padded-container p-4 md:p-10">
        <div className="flex flex-col md:flex-row gap-y-2 gap-x-4 items-center xl:grid content-start col-start-1 col-span-full xl:col-span-1 xl:max-w-96">
          <div className="flex items-center gap-x-6 shrink-0">
            <img
              src={dappLogo}
              height={40}
              width={170}
              className="object-contain my-4"
              alt="logo"
            />
            <ExtLink href="https://www.guidestar.org/profile/shared/5f73977b-cb21-4973-852e-cdfa5c6ee7a5">
              <img
                src="https://widgets.guidestar.org/TransparencySeal/10103678"
                width={100}
                height={100}
              />
            </ExtLink>
          </div>

          <p className="text-xs text-[#3D5361]">
            Better Giving is your nonprofit's free one-stop solution to
            fundraise, save, and invest. We financially empower fellow
            nonprofits with free donation processing integrated with high-yield
            savings and investment services, helping organizations grow their
            funds while reducing administrative burdens. We believe that making
            financial sustainability easy and accessible creates lasting change
            for nonprofits.
          </p>
        </div>

        <div className="xl:contents gap-4 gap-x-12 sm:gap-x-24 row-start-2 row-span-1 col-span-2 flex flex-wrap justify-self-center my-6 sm:my-14">
          {/*<LinkGroup
            classes="col-start-2 col-span-1"
            title="How we can help"
            links={[
              <Link to={appRoutes.home}>Nonprofits</Link>,
              "Giving Partners (CSR)",
            ]}
          />*/}
          <LinkGroup
            classes="col-start-2 col-span-1"
            title="Resources"
            links={[
              <a href={INTERCOM_HELP}>FAQs</a>,
              <Link to={appRoutes.blog}>News</Link>,
              <Link to={appRoutes.about}>About Us</Link>,
            ]}
          />

          <LinkGroup
            classes="col-start-3 col-span-1"
            title="Legal"
            links={[
              <Link to={appRoutes.privacy_policy}>Privacy Policy</Link>,
              <Link to={appRoutes.terms_donors}>
                Terms of Use <br /> (Donors)
              </Link>,
              <Link to={appRoutes.terms_nonprofits}>
                Terms of Use <br /> (Nonprofits)
              </Link>,
            ]}
          />
        </div>

        <Newsletter classes="row-start-3 col-span-2 xl:row-start-1 xl:col-start-5" />
      </div>

      <div className="col-span-2 xl:col-span-5 max-lg:flex-col py-2 px-4 md:px-10 md:py-4 flex gap-y-2 items-center justify-between text-[#316B9C] font-medium bg-[#F1FAFF]">
        <p className="text-[0.93rem] text-center">
          © Copyright {new Date().getFullYear()} {APP_NAME}, A Registered
          Charitable 501(c)(3) (EIN 87-3758939)
        </p>
        <Socials />
      </div>
    </footer>
  );
}

type LinkGroupProps = {
  links: ReactNode[];
  title: string;
  classes?: string;
};
function LinkGroup({ links, title, classes = "" }: LinkGroupProps) {
  return (
    <div className={`grid gap-2 content-start ${classes}`}>
      <h6 className="font-semibold text-[#4585bb] uppercase">{title}</h6>
      <ul className="contents text-sm text-navy-l3">
        {links.map((link, idx) => (
          <li className="contents hover:underline" key={idx}>
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
