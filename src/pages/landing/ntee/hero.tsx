import { Image } from "components/image";
import { BOOK_A_DEMO } from "constants/env";
import { Link, href } from "react-router";
import type { PageContext } from "./types";

interface Props extends PageContext {
  className?: string;
}
export function Hero({ className = "", ...props }: Props) {
  return (
    <section
      className={`${className} grid justify-items-center gap-10 xl:justify-items-start xl:grid-cols-2 pb-24 pt-20`}
    >
      <div className="max-w-2xl order-2 xl:order-1">
        <p className="text-center xl:text-left pre-heading text-blue-d1 mb-5">
          Member powered <span>&#8226;</span> $6M+ kept in{" "}
          {props.hero_subject[1]}, not fees.
        </p>
        <h1 className="text-center xl:text-left section-heading mb-4">
          Raise more this quarter.{" "}
          <span className="text-blue">Grow funds together</span>
        </h1>
        <p className="my-10 text-lg xl:text-xl text-balance text-center xl:text-left">
          Free-no platform or fund-management fees. High-converting donation
          flow helps your {props.hero_subject[2]} bring in more gifts today and
          build lasting capacity over time.
        </p>

        <div className="flex flex-col xl:flex-row justify-center xl:justify-start items-center gap-6">
          <Link
            to={href("/register/welcome")}
            className="text-center btn-blue px-6 py-2 xl:px-10 xl:py-4 xl:text-lg shadow-blue/30 hover:shadow-blue/50 active:translate-x-1  font-bold shadow-2xl rounded-xl"
          >
            Start Free
          </Link>
          <Link
            to={BOOK_A_DEMO}
            className="capitalize text-center bg-white border-blue-d1 text-blue-d1 active:translate-x-1 font-bold  border-2 rounded-xl px-6 py-2 xl:px-8 xl:py-4 xl:text-xl hover:shadow-2xl hover:shadow-blue/50"
          >
            See how it works (&nbsp;Book&nbsp;a&nbsp;call&nbsp;)
          </Link>
        </div>
      </div>
      <Image
        className="max-w-2xl xl:max-w-auto order-1 xl:order-2 w-full self-center rounded-2xl"
        src={props.hero}
      />
    </section>
  );
}
