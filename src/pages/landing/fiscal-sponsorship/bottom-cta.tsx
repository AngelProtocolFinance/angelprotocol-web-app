import { BOOK_A_DEMO } from "constants/env";
import { Link, href } from "react-router";

export function BottomCta({ className = "" }) {
  return (
    <div
      className={`${className} grid bg-linear-to-br from-blue-d1 to-white rounded-3xl md:rounded-4xl px-10 py-12 md:px-16`}
    >
      <h3 className="text-center md:text-left article-heading text-white mb-9">
        Start accepting U.S. donations in days, not months.
      </h3>
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-6">
        <Link
          to={href("/register/welcome")}
          className="btn-blue active:translate-x-1 font-bold shadow-2xl rounded-full px-6 py-2 md:px-10 md:py-5"
        >
          Sign Up Now
        </Link>
        <Link
          to={BOOK_A_DEMO}
          className="bg-white shadow-2xl hover:shadow-white/40 active:translate-x-1 text-blue-d1  font-bold rounded-full px-6 py-2 md:px-10 md:py-5"
        >
          Schedule a Demo
        </Link>
      </div>
    </div>
  );
}
