import { laira } from "assets/laira/laira";
import Image from "components/Image";
import { BOOK_A_DEMO } from "constants/env";
import { appRoutes } from "constants/routes";
import { Link } from "react-router";

export function BottomCta({ className = "" }) {
  return (
    <div
      className={`${className} grid md:grid-cols-[3fr_1fr] bg-gradient-to-br from-blue-d1 to-white rounded-3xl md:rounded-4xl px-10 py-12 md:px-16 md:py-[4.5rem]`}
    >
      <div className="order-2 md:order-1">
        <h4 className="text-center md:text-left uppercase [28rem]:text-lg text-white leading-normal mb-6">
          Simple. Sustainable. Free.
        </h4>
        <h3 className="text-center md:text-left md:leading-snug font-heading text-2xl @md:text-4xl text-white mb-9">
          The all-in-one fundraising solution you deserve is only a few clicks
          away
        </h3>
        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-6">
          <Link
            to={appRoutes.register}
            className="bg-blue-d1 hover:bg-blue-d2 active:translate-x-1 text-white font-heading uppercase font-bold shadow-2xl rounded-full px-8 py-3 md:px-12 md:py-6"
          >
            Start today
          </Link>
          <Link
            to={BOOK_A_DEMO}
            className="bg-white shadow-2xl hover:shadow-white/40 active:translate-x-1 text-blue-d1 font-heading uppercase font-bold rounded-full px-8 py-3 md:px-12 md:py-6"
          >
            Book a Demo
          </Link>
        </div>
      </div>
      <Image
        width={140}
        src={laira.waiving}
        className="place-self-center mb-8 order-1 md:order-2"
      />
    </div>
  );
}
