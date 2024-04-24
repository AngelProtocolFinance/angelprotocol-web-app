import { APP_NAME } from "constants/env";
import { appRoutes } from "constants/routes";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import log from "../../assets/landing/logo.svg";
import { SocialMediaLink } from "../types";
import Newsletter from "./Newsletter";
import Socials from "./Socials";

type Props = { socials: SocialMediaLink[]; classes?: string };

function Footer({ socials, classes = "" }: Props) {
  return (
    <footer
      className={`grid xl:grid-cols-[repeat(5,auto)] content-start ${classes} bg-gray-l4`}
    >
      <div className="grid grid-cols-subgrid grid-rows-subgrid col-span-5 padded-container py-4">
        <div className="grid content-start col-start-1 col-span-1 max-w-96 relative bottom-7">
          <img
            src={log}
            className="h-24 object-cover object-center  "
            alt="logo"
          />
          <p className="text-xs text-[#3D5361] break-words">
            Better Giving simplifies giving with a free platform that lets
            nonprofits around the world easily receive any kind of donation. Our
            Sustainability Fund ensures donations keep supporting causes,
            offering lasting benefits without the hassle. Dedicated to helping
            nonprofits everywhere, we provide essential support and affordable
            fiscal sponsorship, empowering them to achieve their goals. Join us
            in making a difference with every donation, creating enduring impact
            for a better tomorrow.
          </p>
        </div>

        <LinkGroup
          classes="col-start-2 col-span-1"
          title="How we can help"
          links={[
            <Link to={appRoutes.home}>Non-profits</Link>,
            "Giving Partners (CSR)",
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
              Terms of Use <br /> (Non-Profits)
            </Link>,
          ]}
        />
        <LinkGroup
          classes="col-start-4 col-span-1"
          title="Resources"
          links={[
            "About",
            <a href="https://intercom.help/better-giving/en">FAQs</a>,
            <Link to={appRoutes.blog}>News</Link>,
          ]}
        />

        <Newsletter classes="col-start-5 col-span-1" />
      </div>

      <div className="col-span-5 max-lg:flex-col p-3 flex items-center justify-between text-[#316B9C] font-medium bg-[#F1FAFF]">
        <p className="">
          {`© Copyright ${new Date().getFullYear()} ${APP_NAME}, A Registered Charitable 501(C)(3) (EIN 87-3758939)`}
        </p>
        <Socials links={socials} />
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
    <div className={`grid gap-4 content-start ${classes}`}>
      <h6 className="font-semibold text-[#4585bb] uppercase">{title}</h6>
      <ul className="contents text-xs text-black/90">
        {links.map((link, idx) => (
          <li className="contents" key={idx}>
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
