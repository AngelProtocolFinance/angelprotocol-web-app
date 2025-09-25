import { Image } from "components/image";
import { APP_NAME, BOOK_A_DEMO } from "constants/env";
import { app_routes } from "constants/routes";
import { Link } from "react-router";
import type { PageContext } from "./types";

interface Props extends PageContext {
  className?: string;
}
export function Hero({ className = "", ...props }: Props) {
  return (
    <section
      className={`${className} grid justify-items-center gap-10 @6xl:justify-items-start @-6xl:grid-cols-2 pb-24 pt-20`}
    >
      <div className="max-w-2xl order-2 @6xl:order-1">
        <p className="text-center @6xl:text-left text-gray-d4 mb-5">
          Trusted by nonprofits • $6M+ saved from fees
        </p>
        <h1 className="text-center @6xl:text-left text-4.5xl @6xl:text-5xl @6xl:leading-tight text-gray-d4 text-balance mb-4 ">
          Lower Costs, Increase <span className="text-blue">Donations</span>
        </h1>
        <p className="my-10 text-lg @6xl:text-xl text-balance text-center @6xl:text-left">
          {props.hero_copy[1]}{" "}
          <span className="font-semibold">
            {APP_NAME} {props.hero_copy[2]}
          </span>
        </p>

        <div className="flex flex-col @xl:flex-row justify-center @6xl:justify-start items-center gap-6">
          <Link
            to={`${app_routes.register}/welcome`}
            className="text-center btn-blue px-6 py-2 @6xl:px-10 @6xl:py-4 @6xl:text-lg shadow-blue/30 hover:shadow-blue/50 active:translate-x-1 font-heading font-bold shadow-2xl rounded-xl"
          >
            Start Free
          </Link>
          <Link
            to={BOOK_A_DEMO}
            className="capitalize text-center bg-white border-blue-d1 text-blue-d1 active:translate-x-1 font-bold font-heading border-2 rounded-xl px-6 py-2 @6xl:px-8 @6xl:py-4 @6xl:text-xl hover:shadow-2xl hover:shadow-blue/50"
          >
            See how it works (&nbsp;Book&nbsp;a&nbsp;call&nbsp;)
          </Link>
        </div>
      </div>
      <Image
        className="max-w-2xl @6xl:max-w-auto order-1 @6xl:order-2 w-full self-center rounded-2xl"
        src={props.hero}
      />
    </section>
  );
}
