import { APP_NAME, BOOK_A_DEMO } from "constants/env";
import { Link, href } from "react-router";
import hero_img from "./hero-img.png";

export function Hero({ className = "" }) {
  return (
    <section
      className={`${className} grid content-start justify-items-center gap-10 xl:justify-items-start xl:grid-cols-2 py-24`}
    >
      <div className="max-w-2xl order-2 xl:order-1">
        <h4 className="pre-heading text-blue-d1 text-center xl:text-left  uppercase mb-5">
          Giving Tuesday is one day.
        </h4>
        <h1 className="text-center xl:text-left mb-4 hero-heading">
          {APP_NAME} <br /> Lasts All Year.
        </h1>
        <p className="mb-10 text-lg xl:text-xl text-center xl:text-left">
          Other platforms turn on special features for one day. At {APP_NAME},
          they're always on — for free.
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
        width={320}
        alt="laira floating and holding a wrapped gift"
        src={hero_img}
        className="max-xl:w-64 order-1 xl:order-2 justify-self-center self-center"
      />
    </section>
  );
}
