import { Link } from "@remix-run/react";
import { Video, videos } from "components/video";
import { BOOK_A_DEMO } from "constants/env";
import { appRoutes } from "constants/routes";

export default function Hero({ className = "" }) {
  return (
    <section
      className={`${className} grid justify-items-center gap-10 @6xl:justify-items-start @-6xl:grid-cols-2 py-24`}
    >
      <div className="max-w-2xl order-2 @6xl:order-1">
        <h4 className="text-center @6xl:text-left @6xl:text-lg uppercase text-gray-d4 mb-5">
          Funding Today, Funding Forever
        </h4>
        <h1 className="text-center @6xl:text-left text-4.5xl @6xl:text-5xl @6xl:leading-tight text-balance mb-4 text-gray-d4">
          Raise funds easily. <br /> Grow them effortlessly.
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
            className="btn-blue px-6 py-2 @6xl:px-10 @6xl:py-4 @6xl:text-lg shadow-blue/30 hover:shadow-blue/50 active:translate-x-1 font-heading uppercase font-bold shadow-2xl rounded-full"
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
      <Video
        classes="max-w-2xl @6xl:max-w-auto order-1 @6xl:order-2 w-full self-center"
        vid={videos.about}
      />
      {/* <Image
        src={benefits.donors[1].img}
        width={420}
        height={420}
        className="rounded-4xl order-1 @6xl:order-2"
      /> */}
    </section>
  );
}
