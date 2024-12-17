import { laira } from "assets/laira/laira";
import Image from "components/Image";
import { ClaimCta } from "./claim-cta";

export function BottomCta({ className = "" }) {
  return (
    <div className={`${className} grid @4xl:grid-cols-2 gap-4 content-start`}>
      <h4 className="col-span-full text-lg text-blue-d1 uppercase text-center">
        Simple. Sustainable. Free.
      </h4>
      <h2 className="col-span-full text-center text-3xl @4xl:text-4xl leading-snug max-w-2xl justify-self-center mb-12">
        The all-in-one fundraising solution you deserve is only a few clicks
        away
      </h2>

      <div
        className={`${className} justify-items-center col-span-full grid w-full bg-gradient-to-br from-blue-d1 to-transparent p-6 rounded-xl`}
      >
        <h3 className="text-center text-white @3xl:leading-snug font-heading text-xl @sm:text-2xl mb-4 col-span-full">
          US 501(c)(3) Nonprofit?
        </h3>
        <p className="text-white text-lg font-bold mb-2 text-center">
          Claim your nonprofit
        </p>
        <Image width={200} src={laira.negotiating} className="mt-4 mb-8" />
        <ClaimCta classes="flex-col @4xl:flex-row" />
      </div>
    </div>
  );
}
