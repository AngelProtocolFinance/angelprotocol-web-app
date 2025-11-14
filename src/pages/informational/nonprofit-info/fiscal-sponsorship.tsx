import { Image } from "components/image";
import { Link, href } from "react-router";
import fiscalsponsorshipImg from "./images/fiscal-sponsorship.webp";

export function FiscalSponsorship({ className = "" }) {
  return (
    <section
      className={`${className} grid justify-items-center gap-10 @6xl:justify-items-start @6xl:grid-cols-[1fr_auto] py-24`}
    >
      <div className="grid max-w-2xl order-2 @6xl:order-1">
        <h4 className="mb-4 col-span-full text-lg text-blue-d1 uppercase text-center @6xl:text-left">
          Catholic Fiscal Sponsorship: Fund Mission Work at Home and Abroad
        </h4>
        <h1 className="text-center @6xl:text-left text-3xl @6xl:text-4.5xl leading-tight text-pretty mb-6 text-gray-d4">
          Accept U.S. tax-deductible gifts for Catholic mission work—worldwide.
        </h1>
        <p className="mb-6 text-gray text-lg @6xl:text-xl text-center @6xl:text-left">
          Many parishes support sister parishes and mission projects outside the
          U.S. Offeria's Catholic fiscal sponsorship lets your partner
          ministries receive U.S. tax-deductible gifts while we handle the
          legal, tax, and compliance work—so your global mission can move
          forward without obstacles.
        </p>
        <div className="mb-10 text-gray text-lg @6xl:text-xl text-center @6xl:text-left">
          <p className="font-bold mb-2">What you get:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Giving infrastructure from day one (recurring gifts, campaigns,
              stock & crypto)
            </li>
            <li>Compliance handled (U.S. receipting, reporting)</li>
            <li>
              Mission-abroad ready (works for sister parishes and Catholic
              outreach outside the U.S.)
            </li>
          </ul>
        </div>

        <Link
          to={href("/register/welcome")}
          className="justify-self-center text-center @6xl:justify-self-start btn btn-blue rounded-full px-8 py-3 @6xl:px-12 @6xl:py-6 @6xl:text-xl shadow-2xl shadow-blue/30 hover:shadow-blue/50 uppercase"
        >
          Apply for Catholic Fiscal Sponsorship
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
