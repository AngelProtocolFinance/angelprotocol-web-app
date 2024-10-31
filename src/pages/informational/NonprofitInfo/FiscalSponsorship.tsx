import Image from "components/Image";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import fiscalsponsorshipImg from "./images/fiscal-sponsorship.png";

export default function FiscalSponsorship({ className = "" }) {
  return (
    <section
      className={`${className} grid justify-items-center gap-10 @6xl:justify-items-start @6xl:grid-cols-[1fr_auto] py-24`}
    >
      <div className="grid max-w-2xl order-2 @6xl:order-1">
        <h4 className="mb-4 col-span-full text-lg text-blue-d1 uppercase">
          Borderless Donations
        </h4>
        <h1 className="text-center @6xl:text-left text-3xl @6xl:text-4.5xl leading-tight text-pretty mb-6 text-navy-d4">
          Globally Inclusive: We support all nonprofits and NGOs, regardless of
          their size or location
        </h1>
        <p className="mb-10 text-navy-l1 text-lg @6xl:text-xl text-center @6xl:text-left">
          At Better Giving, we recognize that many grassroots organizations,
          especially those outside the US, struggle to access IRS tax-exempt
          status and benefit from US donor support. Our fiscal sponsorship
          program helps bridge this gap, allowing these organizations to receive
          tax-deductible donations while we handle the legal and tax
          complexities for them.
          <br />
          <br />
          To obtain fiscal sponsorship, simply register your nonprofit below!
        </p>

        <Link
          to={appRoutes.register}
          className="justify-self-center text-center @6xl:justify-self-start btn-blue rounded-full px-8 py-3 @6xl:px-12 @6xl:py-6 @6xl:text-xl shadow-2xl shadow-blue/30 hover:shadow-blue/50 uppercase"
        >
          Unlock a new world of donors
        </Link>
      </div>
      <Image
        src={fiscalsponsorshipImg}
        width={572}
        height={572}
        className="rounded-4xl order-1 @6xl:order-2"
      />
    </section>
  );
}
