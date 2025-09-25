import { BOOK_A_DEMO } from "constants/env";
import { app_routes } from "constants/routes";
import { CheckIcon } from "lucide-react";
import { Link } from "react-router";

const features = [
  "🎯 Zero platform fees - forever",
  "📞 Human support - when you need it",
];

const badges = [
  "Platinum Transparency 2025 - Candid",
  "501(c)(3) (EIN 87-3758939) Verified",
];

export function Section7({ classes = "" }: { classes?: string }) {
  return (
    <div className={`${classes} py-26 grid`}>
      <h2 className="text-center text-4.5xl @6xl:text-5xl @6xl:leading-tight capitalize text-white text-balance mb-8">
        Stop losing money. Start Free.
      </h2>
      <p className="text-center text-lg @max-3xl:text-base text-white max-w-3xl mb-8 mx-auto">
        Every day you wait costs you money. That changes today.
      </p>
      <div className="grid gap-10 @xl:grid-cols-2 justify-self-center">
        {features.map((x, idx) => (
          <div
            key={idx}
            className="flex @max-3xl:flex-col items-center gap-x-4"
          >
            <div className="relative p-3 bg-blue-l2 rounded-full">
              <CheckIcon
                className="absolute-center stroke-white "
                size={15}
                strokeWidth={4}
              />
            </div>
            <p className="text-white font-semibold @max-3xl:text-center @max-3xl:mt-4">
              {x}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col @xl:flex-row justify-center items-center gap-6 mt-10">
        <Link
          to={`${app_routes.register}/welcome`}
          className="text-center btn-blue px-6 py-2 @6xl:px-10 @6xl:py-4 @6xl:text-lg shadow-blue/30 hover:shadow-blue/50 active:translate-x-1 font-heading font-bold shadow-2xl rounded-xl"
        >
          Start Today - Free
        </Link>
        <Link
          to={BOOK_A_DEMO}
          className="capitalize text-center bg-white  text-blue-d1 active:translate-x-1 font-bold font-heading rounded-xl px-6 py-2 @6xl:px-8 @6xl:py-4 @6xl:text-xl hover:shadow-2xl hover:shadow-white/20"
        >
          Questions? Chat with us
        </Link>
      </div>
      <div className="bg-blue-l5/10 text-white rounded-xl p-8 mt-8">
        <h6 className="text-center mb-4">Trust Badge</h6>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {badges.map((badge, idx) => (
            <p key={idx} className="flex items-center gap-x-2 text-sm">
              <CheckIcon className="stroke-green-l3" size={18} /> {badge}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
