import bg from "assets/images/bettergiving-logo-white.svg";
import { laira } from "assets/laira/laira";
import Image from "components/image";
import { Footer } from "./footer";
export function Page4({ classes = "" }) {
  return (
    <div className={`w-full ${classes} flex flex-col`}>
      <div className="bg-blue px-6 py-12">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <h2 className="uppercase text-white text-4xl font-bold leading-tight">
            Appendix
          </h2>

          <Image
            src={bg}
            alt="Better Giving Logo"
            width={280}
            height={95.8}
            className="object-contain self-start relative top-4"
          />
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center px-6 mt-8">
        <h2 className="text-2xl font-semibold uppercase">
          Calculation Details
        </h2>
        <div className="h-0.5 bg-gray" />
      </div>
      <div className="mt-8 space-y-8 text-xl px-12">
        <section>
          <h4 className="font-semibold mb-4">Better Giving Platform</h4>
          <ul className="space-y-4 list-disc pl-6">
            <li className="text-gray">
              Better Giving doesn't charge processing fees, but third-party
              services charge an average of 2% (no platform fees)
            </li>
            <li className="text-gray">
              80% of donors opt to cover processing fees (based on platform
              data)
            </li>
            <li className="text-gray">
              Better Giving accepts all donation types (credit cards, ACH,
              digital wallets, crypto, stocks, DAF)
            </li>
          </ul>
        </section>

        <section>
          <h4 className="font-semibold mb-4">Donation Type Calculation</h4>
          <p className="text-gray mb-4">
            These are approximate percentages for U.S.-based nonprofits,
            annualized and projected for 2025 based on trends. Our calculations
            assume 50% of donors will not proceed to make a donation if their
            preferred donation method is unavailable.
          </p>
          <ul className="space-y-4 list-disc pl-6">
            <li className="text-gray">
              Credit card donations: 63% of total volume
            </li>
            <li className="text-gray">
              ACH/Bank Transfer donations: 10% of total volume
            </li>
            <li className="text-gray">
              Digital Wallet donations: 7% of total volume
            </li>
            <li className="text-gray">
              Cryptocurrency donations: 2% of total volume
            </li>
            <li className="text-gray">Stock donations: 6% of total volume</li>
            <li className="text-gray">DAF donations: 12% of total volume</li>
          </ul>
        </section>

        <section>
          <h4 className="font-semibold mb-4">Investment Returns</h4>
          <ul className="space-y-4 list-disc pl-6">
            <li className="text-gray">Savings Account: 4% annual yield</li>
            <li className="text-gray">
              Sustainability Fund: 20% average annual return
            </li>
            <li className="text-gray">Returns compound daily</li>
          </ul>
        </section>
      </div>
      <div className="relative self-end mr-10">
        <Image
          src={laira.laptopFull}
          width={300}
          height={177}
          className="z-10"
        />
        {/** shadow */}
        <svg className="absolute -bottom-1 z-0" width="100%" height="20">
          <defs>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
          </defs>
          <ellipse
            cx="50%"
            cy="50%"
            rx="150"
            ry="10"
            filter="url(#blur)"
            fill="#e2e8f060"
          />
        </svg>
      </div>
      <Footer classes="mt-auto" />
    </div>
  );
}
