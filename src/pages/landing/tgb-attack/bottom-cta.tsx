import logo from "assets/images/bg-logo.webp";
import laira_pointing from "assets/laira/laira-pointing.webp";
import { Image } from "components/image";
import { Link, href } from "react-router";

export function BottomCta({ className = "" }) {
  return (
    <div
      className={`${className} grid sm:grid-cols-[3fr_1fr] bg-linear-to-tr from-blue-d1 to-white rounded-3xl sm:rounded-4xl px-8 py-8 sm:px-12 sm:py-12`}
    >
      <div className="order-2 sm:order-1">
        <h4 className="text-center sm:text-left uppercase sm:text-lg text-white leading-normal mb-6">
          Simple. Sustainable. Free.
        </h4>
        <h3 className="text-center sm:text-left sm:leading-snug  text-2xl text-white mb-9">
          Stop paying for what should be free
        </h3>
        <div className="relative max-sm:justify-self-center">
          <Link
            to={href("/register/welcome")}
            className="btn-blue active:translate-x-1  uppercase font-bold shadow-2xl rounded-full px-6 py-2 sm:px-10 sm:py-4"
          >
            Start today
          </Link>
          <div className="absolute -left-20 isolate">
            <Image
              src={laira_pointing}
              width={90}
              className="z-10 max-sm:w-24"
            />
            {/** shadow */}
            <svg className="absolute -bottom-3 z-0" width="100%" height="20">
              <defs>
                <filter id="blur">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                </filter>
              </defs>
              <ellipse
                cx="50%"
                cy="50%"
                rx="40"
                ry="6"
                filter="url(#blur)"
                className="fill-gray-l3"
                // className="blur-sm"
              />
            </svg>
          </div>
        </div>
      </div>
      <Image
        alt="Letters B & G forming a circle like 8"
        width={120}
        src={logo}
        className="place-self-center mb-8 order-1 sm:order-2 max-xl:w-28"
      />
    </div>
  );
}
