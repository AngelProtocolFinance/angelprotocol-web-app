import laira_laptop_full from "assets/laira/laira-laptop-full.webp";
import { Image } from "components/image";
import { Heart, X } from "lucide-react";

const solutions = [
  {
    problem: "High or Hidden Transaction Fees",
    problemDescription:
      "Platforms charge high fees, subscriptions, and hidden costs that reduce the funds your nonprofit actually receives.",
    solutionDescription:
      "100% of donations go to your nonprofit. No platform fees, no annual subscription, no hidden costs.",
  },
  {
    problem: "Limited or Inconsistent Crypto & Donation Support",
    problemDescription:
      "Some platforms only support a few cryptocurrencies or exclude other donation methods like stock and DAFs.",
    solutionDescription:
      "Accept credit cards, crypto, stock, DAFs, and more cryptocurrencies—all in one place.",
  },
  {
    problem: "Complicated Onboarding & Setup",
    problemDescription:
      "Lengthy sign-up processes, required sales calls, and technical complexity slow down your fundraising.",
    solutionDescription:
      "Get started in one day with a simple setup and embeddable donation forms for your website.",
  },
  {
    problem: "Lack of Personalization & Branding",
    problemDescription:
      "Rigid donation pages don’t match your brand, hurting donor trust and conversions.",
    solutionDescription:
      "Customizable, embeddable forms to match your nonprofit’s branding and campaigns.",
  },
  {
    problem: "Limited Global or Fiscal Sponsorship Support",
    problemDescription:
      "International nonprofits struggle to accept U.S. tax efficient donations due to compliance barriers.",
    solutionDescription:
      "Fiscal sponsorship options for international organizations enable them to seamlessly receive U.S. donations.",
  },
  {
    problem: "Uncertain Reputation or Misalignment with Nonprofit Values",
    problemDescription:
      "Many donation platforms are for-profit companies that prioritize their own revenue over nonprofit success.",
    solutionDescription:
      "We’re a nonprofit too. Our mission aligns with yours—helping nonprofits maximize donations without unnecessary fees.",
  },
  {
    problem: "Missed Recurring or Peer-to-Peer Fundraising Opportunities",
    problemDescription:
      "Some platforms make setting up recurring gifts or peer-to-peer campaigns complicated or costly.",
    solutionDescription:
      "Recurring donation tools & peer-to-peer fundraising come built-in, at no extra cost—fundraisers accept all donation types, including crypto.",
  },
  {
    problem: "Lack of Financial Security & Long-Term Growth Support",
    problemDescription:
      "Large donation platforms focus on transactions, not on helping nonprofits build sustainable revenue.",
    solutionDescription:
      "We help nonprofits create lasting financial security beyond one-time gifts, with tools for reserves and strategic fundraising.",
  },
];

export function ProbSol({ className = "" }) {
  return (
    <section
      className={`${className} grid justify-items-center gap-10 @6xl:justify-items-start @6xl:grid-cols-[2fr_1fr] py-24`}
    >
      <div className="order-2 @6xl:order-1">
        <h4 className="text-center @6xl:text-left @6xl:text-lg uppercase text-blue-d1 mb-5">
          CHALLENGES AND BETTER GIVING SOLUTIONS
        </h4>
        <h1 className="text-center @6xl:text-left text-4.5xl @6xl:text-5xl @6xl:leading-tight text-balance mb-4 text-gray-d4">
          High Fees, Limited Options, and <br /> Unnecessary Complexity
        </h1>
        <p className="mb-10 text-lg @6xl:text-xl text-center @6xl:text-left">
          Many donation platforms{" "}
          <span className="text-amber-d1">take a cut of your funds</span>, limit
          the types of donations you can accept, or require complicated
          onboarding—
          <span className="text-amber-d1">
            hurting your nonprofit’s ability to maximize impact.
          </span>
        </p>
      </div>

      <Image
        src={laira_laptop_full}
        width={180}
        height={180}
        className="order-1 @6xl:order-2 justify-self-center @max-6xl:w-40 @6xl:justify-self-start self-center rotate-y-180"
      />

      <article className="col-span-full order-3">
        <h4 className="text-center @6xl:text-left text-lg @6xl:text-3xl uppercase text-gray-d2 mb-6">
          How Better Giving Solves It
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-l3">
                <th className="text-left  font-medium pb-2">
                  <div className="text-lg flex items-center gap-2 text-red">
                    <X className="text-red" strokeWidth={3} />
                    Problem
                  </div>
                </th>
                <th className="text-left  font-medium pb-2 pl-4 @container/solution">
                  <div className="text-lg flex items-center gap-2 text-blue-d1">
                    <Heart className="shrink-0" />
                    <span className="">Better Giving Solution</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {solutions.map((solution, index) => (
                <>
                  <tr>
                    <td className="font-semibold text-sm py-2 ">
                      {solution.problem}
                    </td>
                    <td />
                  </tr>
                  <tr key={index} className="border-b border-gray-l3">
                    <td className="pb-3 text-gray-d1 text-balance align-top">
                      {solution.problemDescription}
                    </td>
                    <td className="pb-3 pl-4 text-balance text-gray-d1 align-top">
                      {solution.solutionDescription}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
