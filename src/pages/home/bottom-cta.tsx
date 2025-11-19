import { BOOK_A_DEMO } from "constants/env";
import { Link, href } from "react-router";

export function BottomCta({ className = "" }) {
  return (
    <div
      className={`${className} grid bg-linear-to-br from-blue-d1 to-white rounded px-10 py-12 md:px-16`}
    >
      <h4 className="text-center md:text-left uppercase [28rem]:text-lg text-white leading-normal mb-6">
        Simple. Sustainable. Free.
      </h4>
      <h3 className="text-center md:text-left md:leading-snug  text-2xl @md:text-4xl text-white mb-9">
        Ready to grow gifts this quarter? It's only a few clicks away.
      </h3>
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-6">
        <Link
          to={href("/register/welcome")}
          className="btn-blue active:translate-x-1 font-bold shadow-2xl rounded px-6 py-2 md:px-10 md:py-5"
        >
          Sign Up Now
        </Link>
        <Link
          to={BOOK_A_DEMO}
          className="bg-white shadow-2xl hover:shadow-white/40 active:translate-x-1 text-blue-d1  font-bold rounded px-6 py-2 md:px-10 md:py-5"
        >
          Schedule a Demo
        </Link>
      </div>
    </div>
  );
}
