// import { Link } from "@remix-run/react";
import { laira } from "assets/laira/laira";
import Image from "components/image";
// import { AboutVideo } from "components/about-video";
import { Heart, X } from "lucide-react";
// import { BOOK_A_DEMO } from "constants/env";
// import { appRoutes } from "constants/routes";

export function ProbSol({ className = "" }) {
  return (
    <section
      className={`${className} grid justify-items-center gap-10 @6xl:justify-items-start @6xl:grid-cols-[4fr_1fr] py-24`}
    >
      <div className="max-w-2xl order-2 @6xl:order-1">
        <h4 className="text-center @6xl:text-left @6xl:text-lg uppercase text-blue-d1 mb-5">
          CHALLENGES AND BETTER GIVING SOLUTIONS
        </h4>
        <h1 className="text-center @6xl:text-left text-4.5xl @6xl:text-5xl @6xl:leading-tight text-balance mb-4 text-gray-d4">
          High Fees, Limited Options, and <br /> Unnecessary Complexity
        </h1>
        <p className="mb-10 text-lg @6xl:text-xl text-center @6xl:text-left">
          Many donation platforms take a cut of your funds, limit the types of
          donations you can accept, or require complicated onboarding—hurting
          your nonprofit’s ability to maximize impact.
        </p>
      </div>

      <Image
        src={laira.laptop}
        width={120}
        height={120}
        className="order-1 @6xl:order-2 justify-self-center self-center rotate-y-180"
      />

      <article className="col-span-full order-3">
        <h4 className="text-center @6xl:text-left @6xl:text-lg uppercase text-blue-d1 mb-5">
          How Better Giving Solves It
        </h4>
        <ol type="1" className="pl-5 list-decimal grid gap-y-4">
          <li className="mb-4 space-y-2">
            <p className="font-bold">High or Hidden Transaction Fees</p>
            <p>
              <X
                size={20}
                strokeWidth={3}
                className="stroke-red inline-block mr-2"
              />{" "}
              Problem: Platforms charge high fees, subscriptions, and hidden
              costs that reduce the funds your nonprofit actually receives.
            </p>
            <p>
              <Heart
                size={18}
                className="stroke-blue  fill-blue inline-block mr-2"
              />{" "}
              Better Giving Solution: 100% of donations go to your nonprofit. No
              platform fees, no annual subscription, no hidden costs.
            </p>
          </li>
          <li className="mb-4 space-y-2">
            <p className="font-bold">
              Limited or Inconsistent Crypto & Donation Support
            </p>
            <p>
              <X
                size={20}
                strokeWidth={3}
                className="stroke-red inline-block mr-2"
              />{" "}
              Problem: Some platforms only support a few cryptocurrencies or
              exclude other donation methods like stock and DAFs.
            </p>
            <p>
              <Heart
                size={18}
                className="stroke-blue  fill-blue inline-block mr-2"
              />{" "}
              Better Giving Solution: Accept credit cards, crypto, stock, DAFs,
              and more cryptocurrencies—all in one place.
            </p>
          </li>
          <li className="mb-4 space-y-2">
            <p className="font-bold">Complicated Onboarding & Setup</p>
            <p>
              <X
                size={20}
                strokeWidth={3}
                className="stroke-red inline-block mr-2"
              />{" "}
              Problem: Lengthy sign-up processes, required sales calls, and
              technical complexity slow down your fundraising.
            </p>
            <p>
              <Heart
                size={18}
                className="stroke-blue  fill-blue inline-block mr-2"
              />{" "}
              Better Giving Solution: Get started in one day with a simple setup
              and embeddable donation forms for your website.
            </p>
          </li>
          <li className="mb-4 space-y-2">
            <p className="font-bold">Lack of Personalization & Branding</p>
            <p>
              <X
                size={20}
                strokeWidth={3}
                className="stroke-red inline-block mr-2"
              />{" "}
              Problem: Rigid donation pages don’t match your brand, hurting
              donor trust and conversions.
            </p>
            <p>
              <Heart
                size={18}
                className="stroke-blue  fill-blue inline-block mr-2"
              />{" "}
              Better Giving Solution: Customizable, embeddable forms to match
              your nonprofit’s branding and campaigns.
            </p>
          </li>
          <li className="mb-4 space-y-2">
            <p className="font-bold">
              Limited Global or Fiscal Sponsorship Support
            </p>
            <p>
              <X
                size={20}
                strokeWidth={3}
                className="stroke-red inline-block mr-2"
              />{" "}
              Problem: International nonprofits struggle to accept U.S. tax
              efficient donations due to compliance barriers.
            </p>
            <p>
              <Heart
                size={18}
                className="stroke-blue  fill-blue inline-block mr-2"
              />{" "}
              Better Giving Solution: Fiscal sponsorship options for
              international organizations enable them to seamlessly receive U.S.
              donations.
            </p>
          </li>
          <li className="mb-4 space-y-2">
            <p className="font-bold">
              Uncertain Reputation or Misalignment with Nonprofit Values
            </p>
            <p>
              <X
                size={20}
                strokeWidth={3}
                className="stroke-red inline-block mr-2"
              />{" "}
              Problem: Many donation platforms are for-profit companies that
              prioritize their own revenue over nonprofit success.
            </p>
            <p>
              <Heart
                size={18}
                className="stroke-blue  fill-blue inline-block mr-2"
              />{" "}
              Better Giving Solution: We’re a nonprofit too. Our mission aligns
              with yours—helping nonprofits maximize donations without
              unnecessary fees.
            </p>
          </li>
          <li className="mb-4 space-y-2">
            <p className="font-bold">
              Missed Recurring or Peer-to-Peer Fundraising Opportunities
            </p>
            <p>
              <X
                size={20}
                strokeWidth={3}
                className="stroke-red inline-block mr-2"
              />{" "}
              Problem: Some platforms make setting up recurring gifts or
              peer-to-peer campaigns complicated or costly.
            </p>
            <p>
              <Heart
                size={18}
                className="stroke-blue  fill-blue inline-block mr-2"
              />{" "}
              Better Giving Solution: Recurring donation tools & peer-to-peer
              fundraising come built-in, at no extra cost—fundraisers accept all
              donation types, including crypto.
            </p>
          </li>
          <li className="mb-4 space-y-2">
            <p className="font-bold">
              Lack of Financial Security & Long-Term Growth Support
            </p>
            <p>
              <X
                size={20}
                strokeWidth={3}
                className="stroke-red inline-block mr-2"
              />{" "}
              Problem: Large donation platforms focus on transactions, not on
              helping nonprofits build sustainable revenue.
            </p>
            <p>
              <Heart
                size={18}
                className="stroke-blue  fill-blue inline-block mr-2"
              />{" "}
              Better Giving Solution: We help nonprofits create lasting
              financial security beyond one-time gifts, with tools for reserves
              and strategic fundraising.
            </p>
          </li>
        </ol>
      </article>
    </section>
  );
}
