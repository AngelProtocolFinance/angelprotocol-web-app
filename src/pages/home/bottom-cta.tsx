import laira_waiving from "assets/laira/laira-waiving.webp";
import { Image } from "components/image";
import { BOOK_A_DEMO } from "constants/env";
import { Link, href } from "react-router";

export function BottomCta({ className = "" }) {
  return (
    <div
      className={`${className} grid md:grid-cols-[3fr_1fr] bg-linear-to-br from-blue-d1 to-white rounded-3xl md:rounded-4xl px-10 py-12 md:px-16`}
    >
      <div className="order-2 md:order-1">
        <h4 className="text-center md:text-left uppercase [28rem]:text-lg text-white leading-normal mb-6">
          Simple. Sustainable. Free.
        </h4>
        <h3 className="text-center md:text-left md:leading-snug  text-2xl @md:text-4xl text-white mb-9">
          Ready to grow gifts this quarter? It's only a few clicks away.
        </h3>
        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-6">
          <Link
            to={href("/register/welcome")}
            className="btn-blue active:translate-x-1 font-bold shadow-2xl rounded-full px-6 py-2 md:px-10 md:py-5"
          >
            Join us today!
          </Link>
          <Link
            to={BOOK_A_DEMO}
            className="bg-white shadow-2xl hover:shadow-white/40 active:translate-x-1 text-blue-d1  font-bold rounded-full px-6 py-2 md:px-10 md:py-5"
          >
            Book a demo
          </Link>
        </div>
      </div>
      <Image
        alt="Laira waiving"
        width={140}
        src={laira_waiving}
        className="place-self-center mb-8 order-1 md:order-2"
      />
    </div>
  );
}
