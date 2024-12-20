import Image from "components/Image";
import { BOOK_A_DEMO } from "constants/env";
import { appRoutes } from "constants/routes";
import { benefits } from "content/benefits";
import { useRendered } from "hooks/use-rendered";
import { Link } from "react-router-dom";

export function Top({ className = "" }) {
  useRendered();
  return (
    <section
      className={`${className} grid justify-items-center gap-10 @6xl:justify-items-start @6xl:grid-cols-[3fr_2fr] py-24`}
    >
      <div className="max-w-2xl order-2 @6xl:order-1 grid">
        <h4 className="text-center @6xl:text-left @6xl:text-lg uppercase text-blue-d1 mb-5">
          Setup Today, Grow Forever
        </h4>
        <h1 className="text-center @6xl:text-left text-4.5xl @6xl:text-6xl @6xl:leading-tight text-balance mb-4 text-navy-d4">
          Simplify Fundraising, Maximize Impact
        </h1>
        <p className="text-lg @6xl:text-xl text-center @6xl:text-left">
          Better Giving streamlines donations, simplifies administration, and
          helps your nonprofit grow its funds—all through an easily embeddable
          donation form.
        </p>
        <ul className="pl-5 my-8 text-lg @6xl:text-xl space-y-4 text-center @6xl:text-left list-disc list-outside">
          <li>
            Accept donations seamlessly: credit card, crypto, stock, and DAF
            gifts—<span className="font-bold">ZERO PLATFORM FEES</span>.
          </li>
          <li>
            Simplify operations with automated tax reporting and customizable
            forms.
          </li>
          <li>
            Grow funds sustainably with high-yield savings and investment
            options.
          </li>
        </ul>

        <div className="flex flex-col @sm:flex-row justify-center @6xl:justify-start items-center gap-6 mt-6">
          <Link
            to={appRoutes.register}
            className="px-6 py-2 @6xl:px-10 @6xl:py-4 @6xl:text-lg shadow-blue/30 hover:shadow-blue/50 bg-blue-d1 active:translate-x-1 text-white font-heading uppercase font-bold shadow-2xl rounded-full"
          >
            Start today
          </Link>
          <Link
            to={BOOK_A_DEMO}
            className="uppercase bg-white border-blue-d1 text-blue-d1 active:translate-x-1 font-bold font-heading border-2 rounded-full px-6 py-2 @6xl:px-8 @6xl:py-4 @6xl:text-xl hover:shadow-2xl hover:shadow-blue/50"
          >
            Book a Demo
          </Link>
        </div>
      </div>
      <Image
        src={benefits.donors[1].img}
        width={600}
        height={600}
        className="rounded-full order-1 @6xl:order-2 w-96 @6xl:w-auto shadow-2xl shadow-black/20"
      />
    </section>
  );
}
