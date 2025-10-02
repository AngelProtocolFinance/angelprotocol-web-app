import laira_waiving from "assets/laira/laira-waiving.webp";
import { Image } from "components/image";
import { app_routes } from "constants/routes";

import { Link } from "react-router";

export function BottomCta({ className = "" }) {
  return (
    <div
      className={`${className} grid @5xl:grid-cols-2 bg-blue-d1 rounded-3xl @5xl:rounded-4xl ring-8 @md:ring-[1rem] ring-blue-l4 px-10 py-12 @5xl:px-16 @5xl:py-[4.5rem]`}
    >
      <div className="grid order-2 @5xl:order-1">
        <h4 className="text-center @5xl:text-left uppercase @md:text-lg text-white leading-normal mb-6">
          Simple. Sustainable. Free.
        </h4>
        <h3 className="text-center @5xl:text-left @5xl:leading-snug font-heading text-2xl @sm:text-4xl text-white mb-9">
          Together, we can change the world for good
        </h3>
        <Link
          to={app_routes.marketplace}
          className="disabled:bg-gray-l3 aria-disabled:bg-gray-l3 text-blue-d1 border border-blue-d1 enabled:hover:border-blue justify-self-center @5xl:justify-self-start btn bg-white rounded-full px-8 py-3 @5xl:px-12 @5xl:py-6 @5xl:text-xl"
        >
          Donate today
        </Link>
      </div>
      <Image
        src={laira_waiving}
        className="place-self-center mb-8 order-1 @5xl:order-2"
      />
    </div>
  );
}
