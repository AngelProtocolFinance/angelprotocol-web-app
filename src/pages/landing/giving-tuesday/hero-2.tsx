import { APP_NAME, BOOK_A_DEMO } from "constants/env";
import { Link, href } from "react-router";
import hero_img from "./hero-2-img.png";

export function Hero2({ className = "" }) {
  return (
    <section
      className={`${className} grid content-start justify-items-center gap-10 xl:justify-items-start xl:grid-cols-2 py-28`}
    >
      <div className="max-w-2xl order-2 xl:order-1">
        <h1 className="text-center xl:text-left mb-4 section-heading">
          Why stop at one day of generosity?
        </h1>
        <p className="mb-10 text-lg xl:text-xl text-center xl:text-left">
          Every year, Giving Tuesday brings a surge of generosity and a flood of
          "limited-time offers." But those features often vanish the next day.
        </p>
        <p className="mb-10 text-lg xl:text-xl text-center xl:text-left text-blue-d1 font-semibold">
          At {APP_NAME}, generosity doesn't expire. Every donation works harder,
          every day of the year.
        </p>

        <div className="flex flex-col xl:flex-row justify-center xl:justify-start items-center gap-6">
          <Link
            to={href("/register/welcome")}
            className="btn-blue px-6 py-2 xl:px-10 xl:py-4 xl:text-lg shadow-blue/30 hover:shadow-blue/50 active:translate-x-1 font-bold shadow-2xl rounded-full"
          >
            Join us today!
          </Link>
          <Link
            to={BOOK_A_DEMO}
            className="bg-white border-blue-d1 text-blue-d1 active:translate-x-1 font-bold border-2 rounded-full px-6 py-2 xl:px-8 xl:py-4 xl:text-lg hover:shadow-2xl hover:shadow-blue/50"
          >
            Learn how it works
          </Link>
        </div>
      </div>
      <img
        width={450}
        alt="laira floating and holding a wrapped gift"
        src={hero_img}
        className="max-xl:w-64 order-1 xl:order-2 xl:justify-self-end self-center"
      />
    </section>
  );
}
