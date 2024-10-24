import { laira } from "assets/laira/laira";
import Image from "components/Image";
import { BOOK_A_DEMO } from "constants/env";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";

export function BottomCta({ className = "" }) {
  return (
    <div
      className={`${className} grid sm:grid-cols-[3fr_1fr] bg-blue-d1 rounded-3xl sm:rounded-4xl ring-8 [28rem]:ring-[1rem] ring-blue-l4 px-10 py-12 sm:px-16 sm:py-[4.5rem]`}
    >
      <div className="order-2 sm:order-1">
        <h4 className="text-center sm:text-left uppercase [28rem]:text-lg text-white leading-normal mb-6">
          Simple. Sustainable. Free.
        </h4>
        <h3 className="text-center sm:text-left sm:leading-snug font-heading text-2xl @sm:text-4xl text-white mb-9">
          The all-in-one fundraising solution you deserve is only a few clicks
          away
        </h3>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-6">
          <Link
            to={appRoutes.register}
            className="btn-outline-blue bg-white rounded-full px-8 py-3 sm:px-12 sm:py-6"
          >
            Start today
          </Link>
          <Link
            to={BOOK_A_DEMO}
            className="btn-outline-blue bg-white border-2 rounded-full px-8 py-3 sm:px-12 sm:py-6"
          >
            Book a Demo
          </Link>
        </div>
      </div>
      <Image
        width={140}
        src={laira.waiving}
        className="place-self-center mb-8 order-1 sm:order-2"
      />
    </div>
  );
}
