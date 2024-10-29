import Image from "components/Image";
import { BOOK_A_DEMO } from "constants/env";
import { appRoutes } from "constants/routes";
import { benefits } from "content/benefits";
import { useRendered } from "hooks/use-rendered";
import { Link } from "react-router-dom";

export default function Hero({ className = "" }) {
  useRendered();
  return (
    <section
      className={`${className} grid justify-items-center gap-y-10 @6xl:justify-items-start @6xl:grid-cols-[3fr_2fr] py-24`}
    >
      <div className="max-w-2xl order-2 @6xl:order-1">
        <h4 className="text-center @6xl:text-left @6xl:text-lg uppercase text-navy-d4 mb-5">
          Funding Today, Funding Forever
        </h4>
        <h1 className="text-center @6xl:text-left text-4xl @6xl:text-5xl @6xl:leading-tight text-pretty mb-4 text-navy-d4">
          Raise funds easily. Grow them effortlessly.
        </h1>
        <p className="mb-10 text-lg @6xl:text-xl text-center @6xl:text-left">
          Better Giving streamlines donations, simplifies administration, and
          helps your nonprofit grow its funds—all through an easily embeddable
          donation form. As a 501(c)(3) ourselves, we accept donations on your
          behalf, automate tax receipts, and grant 100% of the funds to you—no
          fees, no hassle.
        </p>

        <div className="flex flex-col @sm:flex-row justify-center @6xl:justify-start items-center gap-6">
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
        width={500}
        height={500}
        className="rounded-4xl order-1 @6xl:order-2"
      />
    </section>
  );
}
