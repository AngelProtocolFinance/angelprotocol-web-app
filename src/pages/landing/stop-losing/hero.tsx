import { Link } from "@remix-run/react";
import { Video, videos } from "components/video/video";
import { APP_NAME, BOOK_A_DEMO } from "constants/env";
import { appRoutes } from "constants/routes";

export default function Hero({ className = "" }) {
  return (
    <section
      className={`${className} grid justify-items-center gap-10 @6xl:justify-items-start @-6xl:grid-cols-2 py-24`}
    >
      <div className="max-w-2xl order-2 @6xl:order-1">
        <p className="text-center @6xl:text-left text-gray-d4 mb-5">
          Used by 100+ nonprofits • $6M+ saved from fees
        </p>
        <h1 className="text-center @6xl:text-left text-4.5xl @6xl:text-5xl @6xl:leading-tight text-gray-d4 text-balance mb-4 ">
          Stop Losing <span className="text-blue">$3,000+</span> Every Year to
          Donation Fees.
        </h1>
        <p className="mb-4 text-lg @6xl:text-xl text-center @6xl:text-left">
          Every donation costs you 3-7% in fees. That's $3,000 lost on $100,000
          raised.
        </p>
        <p className="mb-4 text-lg @6xl:text-xl text-center @6xl:text-left">
          {APP_NAME} ends this robbery.
          <br />
          <span className="font-semibold">
            Zero platform fees. Your donors' money goes 100% to your mission.
          </span>
        </p>
        <p className="mb-10 text @6xl:text-lg text-center @6xl:text-left">
          **Every day you wait costs another $47.**
        </p>

        <div className="flex flex-col @xl:flex-row justify-center @6xl:justify-start items-center gap-6">
          <Link
            to={`${appRoutes.register}/welcome`}
            className="btn-blue px-6 py-2 @6xl:px-10 @6xl:py-4 @6xl:text-lg shadow-blue/30 hover:shadow-blue/50 active:translate-x-1 font-heading uppercase font-bold shadow-2xl rounded-xl"
          >
            Start free
          </Link>
          <Link
            to={BOOK_A_DEMO}
            className="capitalize text-center bg-white border-blue-d1 text-blue-d1 active:translate-x-1 font-bold font-heading border-2 rounded-xl px-6 py-2 @6xl:px-8 @6xl:py-4 @6xl:text-xl hover:shadow-2xl hover:shadow-blue/50"
          >
            See how in 5 Minutes (&nbsp;Demo&nbsp;)
          </Link>
        </div>
      </div>
      <Video
        classes="max-w-2xl @6xl:max-w-auto order-1 @6xl:order-2 w-full self-center"
        vid={videos.about}
      />
    </section>
  );
}
