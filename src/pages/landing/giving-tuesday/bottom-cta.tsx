import { APP_NAME } from "constants/env";
import { Link, href } from "react-router";

export function BottomCta({ className = "" }) {
  return (
    <div
      className={`${className} bg-gradient-to-br from-blue-d1 to-blue-l2 rounded-3xl md:rounded-4xl px-10 py-12 md:px-16 lg:px-20 lg:py-16`}
    >
      <h2 className="text-center text-4xl md:text-5xl lg:text-5xl text-white mb-6 leading-tight">
        Join nonprofits who keep the Giving Tuesday spirit alive — all year.
      </h2>
      <p className="text-center text-lg md:text-xl text-blue-l4 mb-10 max-w-4xl mx-auto">
        {APP_NAME} is free for 501(c)(3)s. Start earning, saving, and growing
        donor trust today.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
        <Link
          to={href("/register/welcome")}
          className="btn-blue active:translate-x-1 font-bold shadow-2xl rounded-full px-8 py-3 md:px-10 md:py-4"
        >
          Join us today!
        </Link>
        <Link
          to={href("/nonprofit")}
          className="bg-white shadow-2xl hover:shadow-blue-l4 active:translate-x-1 text-blue-d1 font-bold rounded-full px-8 py-3 md:px-10 md:py-4"
        >
          Learn how it works
        </Link>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-l2 max-w-4xl mx-auto">
        <p className="text-lg md:text-xl italic text-blue-l5 mb-4 text-center">
          "{APP_NAME} helped us keep donations flowing long after Giving Tuesday
          ended — and the yields didn't stop either."
        </p>
        <p className="text-blue-l3 text-center">
          — Sarah Chen, Executive Director
        </p>
      </div>
    </div>
  );
}
