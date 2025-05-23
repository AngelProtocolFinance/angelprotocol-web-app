import { Link } from "@remix-run/react";
import { laira } from "assets/laira/laira";
import Image from "components/image";
import { APP_NAME } from "constants/env";
import { appRoutes } from "constants/routes";
import { ArrowRight } from "lucide-react";

export function Top({ classes = "" }) {
  return (
    <section className={`${classes} relative grid pt-36 pb-20`}>
      <p className="text-sm md:text-lg font-heading uppercase font-bold text-center mb-5 tracking-wider text-blue-d1">
        Earn while supporting nonprofits
      </p>
      <h1 className="mx-auto text-3xl/tight md:text-4xl/tight lg:text-5xl/tight text-center text-pretty mb-6 px-6 ">
        Join the {APP_NAME}
        <br /> Referral Program
      </h1>
      <div className="relative">
        <p className="px-6 max-w-5xl mx-auto text-gray-d1 max-md:block md:text-2xl text-center text-pretty sm:text-balance">
          Empower nonprofits and earn simply by sharing {APP_NAME}. Make an
          impact while building a community of changemakers.
        </p>
      </div>
      <div className="flex items-baseline justify-self-center">
        <div className="relative bottom-5">
          <Image src={laira.yellow} width={80} className="z-10  rotate-z-360" />
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
        <div className="relative">
          <Image
            src={laira.shakeHandsX2}
            width={190}
            className="z-10 rotate-z-360"
          />
          {/** shadow */}
          <svg
            className="absolute bottom-2 left-0 -z-10"
            width="100%"
            height="20"
          >
            <defs>
              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
              </filter>
            </defs>
            <ellipse
              cx="50%"
              cy="50%"
              rx="80"
              ry="12"
              filter="url(#blur)"
              className="fill-gray-l3/80"
            />
          </svg>
        </div>
      </div>

      <Link
        to={{
          pathname: appRoutes.signup,
          search: `?redirect=${appRoutes.user_dashboard}/referrals`,
        }}
        className="btn-blue mt-8 justify-self-center ml-1 group active:translate-x-1 font-bold shadow-2xl inline-flex items-center px-10 py-3 gap-1 rounded-full text-lg font-heading"
      >
        Become an Affiliate
        <ArrowRight size={18} className="group-hover:translate-x-1" />
      </Link>
    </section>
  );
}
