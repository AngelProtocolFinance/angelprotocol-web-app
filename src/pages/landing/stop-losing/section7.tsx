import { Link } from "@remix-run/react";
import { BOOK_A_DEMO } from "constants/env";
import { appRoutes } from "constants/routes";
import { CheckIcon } from "lucide-react";

const features = [
  "🎯 Zero platform fees - forever",
  "⚡ 5-minute setup - live tonight",
  "🛡️ 100% secure - FDIC protected",
  "📞 Human support - when you need it",
];
export function Section7({ classes = "" }: { classes?: string }) {
  return (
    <div className={`${classes} py-26 grid`}>
      <h2 className="text-center text-4.5xl @6xl:text-5xl @6xl:leading-tight capitalize text-white text-balance mb-8">
        Stop losing money. Start tonight.
      </h2>
      <p className="text-center text-lg @max-3xl:text-base text-white max-w-3xl mb-8 mx-auto">
        Every day you wait costs you money. Donation fees pile up. Admin time
        gets wasted. Your reserves earn nothing.
      </p>
      <h3 className="my-4 text-center text-1.5xl @6xl:text-2xl @6xl:leading-tight capitalize text-white text-balance">
        Tonight, that changes.
      </h3>
      <p className="text-center text-lg @max-3xl:text-base text-white max-w-3xl mx-auto">
        Join 100+ arts nonprofits who've eliminated fees and reclaimed their
        financial power.
      </p>
      <div className="grid gap-4 grid-cols-2 justify-self-center mt-8">
        {features.map((x, idx) => (
          <div key={idx} className="flex items-center gap-x-4">
            <div className="relative p-3 bg-blue-l2 rounded-full">
              <CheckIcon
                className="absolute-center stroke-white"
                size={15}
                strokeWidth={4}
              />
            </div>
            <p className="text-white font-semibold">{x}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col @xl:flex-row justify-center items-center gap-6 mt-16">
        <Link
          to={`${appRoutes.register}/welcome`}
          className="text-center btn-blue px-6 py-2 @6xl:px-10 @6xl:py-4 @6xl:text-lg shadow-blue/30 hover:shadow-blue/50 active:translate-x-1 font-heading uppercase font-bold shadow-2xl rounded-xl"
        >
          Start saving tonight - 100% free
        </Link>
        <Link
          to={BOOK_A_DEMO}
          className="capitalize text-center bg-white  text-blue-d1 active:translate-x-1 font-bold font-heading rounded-xl px-6 py-2 @6xl:px-8 @6xl:py-4 @6xl:text-xl hover:shadow-2xl hover:shadow-white/20"
        >
          Questions? Chat with our nonprofit team
        </Link>
      </div>
    </div>
  );
}
