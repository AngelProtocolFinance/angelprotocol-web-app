import Image from "components/Image";
import { INTERCOM_HELP } from "constants/env";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import heroImg from "./images/hero.png";

export default function Hero({ className = "" }) {
  return (
    <section
      className={`${className} grid justify-items-center gap-y-10 @6xl:justify-items-start @6xl:grid-cols-[3fr_2fr] py-24`}
    >
      <div className="max-w-2xl order-2 @6xl:order-1">
        <h4 className="text-center @6xl:text-left @6xl:text-lg uppercase text-navy-d4 mb-5">
          Funding Today, Funding Forever
        </h4>
        <h1 className="text-center @6xl:text-left text-4xl @6xl:text-5xl @6xl:leading-tight text-pretty mb-4 text-navy-d4">
          Fundraising made simple, sustainable, and entirely free
        </h1>
        <p className="mb-10 text-lg @6xl:text-xl text-center @6xl:text-left">
          Accept any type of donation, anywhere in the world
        </p>

        <div className="flex flex-col @sm:flex-row justify-center @6xl:justify-start items-center gap-6">
          <Link
            to={appRoutes.register}
            className="btn-blue rounded-full px-8 py-3 @6xl:px-12 @6xl:py-6 @6xl:text-xl shadow-2xl shadow-blue/30 hover:shadow-blue/50"
          >
            Start today
          </Link>
          <Link
            to={INTERCOM_HELP}
            className="btn-outline-blue border-2 rounded-full px-8 py-3 @6xl:px-12 @6xl:py-6 @6xl:text-xl hover:shadow-2xl hover:shadow-blue/50"
          >
            Book a Demo
          </Link>
        </div>
      </div>
      <Image
        src={heroImg}
        width={500}
        height={500}
        className="rounded-4xl order-1 @6xl:order-2"
      />
    </section>
  );
}
