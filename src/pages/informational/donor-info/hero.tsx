import { Link } from "@remix-run/react";
import Image from "components/image";
import { appRoutes } from "constants/routes";
import { benefits } from "content/benefits";

export default function Hero({ className = "" }) {
  return (
    <section
      className={`${className} grid justify-items-center gap-y-10 @6xl:justify-items-start @-6xl:grid-cols-[3fr_2fr] py-24`}
    >
      <div className="grid content-start max-w-2xl order-2 @6xl:order-1">
        <h4 className="text-center @6xl:text-left @6xl:text-lg uppercase text-navy-d4 mb-5">
          Give today, give forever
        </h4>
        <h1 className="text-center @6xl:text-left text-4xl @6xl:text-5xl @6xl:leading-tight text-pretty mb-4 text-navy-d4">
          Making a lasting impact has never been so simple
        </h1>
        <p className="mb-10 text-lg @6xl:text-xl text-center @6xl:text-left">
          Easily support grassroots organizations all over the world with card,
          crypto, stock, and DAF gifts that keep on giving. As a nonprofit, we
          charge no platform fees.
        </p>

        <Link
          to={appRoutes.marketplace}
          className="justify-self-center @6xl:justify-self-start btn-blue rounded-full px-8 py-3 @6xl:px-12 @6xl:py-6 @6xl:text-xl shadow-2xl shadow-blue/30 hover:shadow-blue/50"
        >
          Donate today
        </Link>
      </div>

      <Image
        src={benefits.nonprofits[1].img}
        width={350}
        height={350}
        className="order-1 @6xl:order-2 justify-self-center"
      />
    </section>
  );
}
