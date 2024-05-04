import Image from "components/Image";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import fiscalsponsorshipImg from "./images/fiscal-sponsorship.png";

export default function FiscalSponsorship({ className = "" }) {
  return (
    <section
      className={`${className} grid justify-items-center gap-y-10 @6xl:justify-items-start @6xl:grid-cols-[1fr_auto] py-24`}
    >
      <div className="grid max-w-2xl order-2 @6xl:order-1">
        <h1 className="text-center @6xl:text-left text-3xl @6xl:text-4.5xl leading-tight text-pretty mb-6 text-navy-d4">
          Fundraising made simple, sustainable, and entirely free
        </h1>
        <p className="mb-10 text-navy-l1 text-lg @6xl:text-xl text-center @6xl:text-left">
          At Better Giving, we understand that many impactful organizations,
          especially smaller, grassroots initiatives outside the US, may lack
          access to the resources needed to achieve IRS tax-exempt status to
          benefit from tax efficient donations from US donors. Our fiscal
          sponsorship program is designed to bridge these gaps. By acting as a
          fiscal sponsor, Better Giving enables these organizations to receive
          tax-deductible donations through us, facilitating their access to a
          broader base of support without the burden of managing legal and tax
          complexities themselves.
          <br />
          <br />
          To obtain fiscal sponsorship, simply register your nonprofit below!
        </p>

        <Link
          to={appRoutes.register}
          className="justify-self-center @6xl:justify-self-start btn-blue rounded-full px-8 py-3 @6xl:px-12 @6xl:py-6 @6xl:text-xl shadow-2xl shadow-blue/30 hover:shadow-blue/50"
        >
          Register today
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
