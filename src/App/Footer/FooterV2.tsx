import { APP_NAME } from "constants/env";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import log from "../../assets/landing/logo.svg";
import { SocialMediaLink } from "../types";
import Newsletter from "./Newsletter";
import Socials from "./Socials";

type Props = { socials: SocialMediaLink[] };

function Footer({ socials }: Props) {
  return (
    <footer className="flex flex-col lg:gap-20 gap-[50px] pt-[50px] font-body">
      <div className="flex flex-col lg:items-center  lg:justify-between lg:flex-row md:flex-col px-6 lg:px-16 md:px-[30px] gap-[70px]">
        <div className="flex flex-col gap-5 lg:flex-col md:flex-row lg:max-w-[28%] lg:gap-6 md:gap-[30px] md:items-start md:justify-between">
          <div className=" lg:w-[250px] md:w-[280px] w-[300px] lg:h-16 md:h-16 h-20 md:scale-[1] lg:scale-[1] scale-[.9] lg:-ml-7 md:-ml-2 -mb-2">
            <img
              src={log}
              className=" w-full h-full object-cover object-center  "
              alt="logo"
            />
          </div>

          <p className="text-xs text[#3D5361] text-start break-words md:p-0  lg:w-full   md:w-[70%] lg:ml-0 md:ml-6 font-normal  leading-2 -tracking-[.1px]">
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

        <div className="flex gap-[70px] flex-wrap md:flex-nowrap lg:self-auto md:self-center lg:-ml-2.5 ">
          <div className="flex flex-col gap-5">
            <h6 className="text-base font-semibold text-[#4585bb] md:mb-0 -mb-2">
              HOW WE CAN HELP
            </h6>
            <ul>
              <li className="text-xs text-black whitespace-nowrap font-normal opacity-90">
                <Link to={appRoutes.home}>Non-profits</Link>
              </li>
              <li className="text-xs text-black mt-4 whitespace-nowrap font-normal opacity-90">
                Giving Partners (CSR)
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h6 className="text-base font-semibold text-[#4585bb] md:mb-0 -mb-2">
              RESOURCES
            </h6>
            <ul>
              <li className="text-xs text-black whitespace-nowrap font-normal opacity-90">
                About
              </li>
              <li className="text-xs text-black mt-4  whitespace-nowrap font-normal opacity-90">
                <a href="https://intercom.help/better-giving/en">FAQs</a>
              </li>
              <li className="text-xs text-black mt-4 whitespace-nowrap font-normal opacity-90">
                <Link to={appRoutes.blog}>News</Link>
              </li>
            </ul>
          </div>
          <div className=" flex flex-col gap-5">
            <h6 className="text-base font-semibold text-[#4585bb] md:mb-0 -mb-2">
              LEGAL
            </h6>
            <ul>
              <li className="text-xs text-black  whitespace-nowrap font-normal opacity-90">
                <Link to={appRoutes.privacy_policy}>Privacy Policy</Link>
              </li>
              <li className="text-xs text-black mt-4  whitespace-nowrap font-normal opacity-90">
                <Link to={appRoutes.terms_donors}>
                  Terms of Use <br /> (Donors)
                </Link>
              </li>
              <li className="text-xs text-black mt-4 whitespace-nowrap font-normal opacity-90">
                <Link to={appRoutes.terms_nonprofits}>
                  Terms of Use <br /> (Non-Profits)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:ml-16 md:ml-0 lg:flex-col lg:gap-6 md md:flex-row md:justify-between">
          <Newsletter />
        </div>
      </div>

      <div className="lg:h-16 text-[#316B9C] font-medium px-6 lg:px-[60px] py-3.5 flex justify-between items-center flex-col-reverse gap-[15px] lg:flex-row md:gap-5 bg-[#F1FAFF]">
        <p className=" text-[12px] md:text-[15px] text-center w-full">
          <span className="">
            {`© Copyright ${new Date().getFullYear()} ${APP_NAME}, A Registered Charitable 501(C)(3) (EIN 87-3758939)`}
          </span>
        </p>
        <section className="padded-container flex flex-col items-center gap-3 w-full">
          <Socials links={socials} />
        </section>
      </div>
    </footer>
  );
}

export default Footer;
