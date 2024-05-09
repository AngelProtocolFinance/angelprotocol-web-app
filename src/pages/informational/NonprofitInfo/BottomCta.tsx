import waivingLira from "assets/images/waving-character.png";
import Image from "components/Image";
import { INTERCOM_HELP } from "constants/env";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";

export default function BottomCta({ className = "" }) {
  return (
    <div
      className={`${className} grid @5xl:grid-cols-[3fr_1fr] bg-blue-d1 rounded-3xl @5xl:rounded-4xl ring-8 @md:ring-[1rem] ring-blue-l4 px-10 py-12 @5xl:px-16 @5xl:py-[4.5rem]`}
    >
      <div className="order-2 @5xl:order-1">
        <h4 className="text-center @5xl:text-left uppercase @md:text-lg text-white leading-normal mb-6">
          Simple. Sustainable. Free.
        </h4>
        <h3 className="text-center @5xl:text-left @5xl:leading-snug font-heading text-2xl @sm:text-4xl text-white mb-9">
          The all-in-one fundraising solution you deserve is only a few clicks
          away
        </h3>
        <div className="flex flex-col sm:flex-row justify-center @5xl:justify-start items-center gap-6">
          <Link
            to={appRoutes.register}
            className="btn-outline-blue bg-white rounded-full px-8 py-3 @5xl:px-12 @5xl:py-6 @5xl:text-xl"
          >
            Start today
          </Link>
          <Link
            to={INTERCOM_HELP}
            className="btn-outline-blue bg-white border-2 rounded-full px-8 py-3 @5xl:px-12 @5xl:py-6 @5xl:text-xl"
          >
            Book a Demo
          </Link>
        </div>
      </div>
      <Image
        src={waivingLira}
        className="place-self-center mb-8 scale-150 order-1 @5xl:order-2"
      />
    </div>
  );
}
