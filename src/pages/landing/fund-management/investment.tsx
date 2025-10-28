import section_img from "assets/images/laira-inside-pie-chart.png";
import { Image } from "components/image";
import { APP_NAME } from "constants/env";

export function Investment({ classes = "" }) {
  return (
    <section className={`${classes} grid`}>
      <h2 className="col-span-full text-center section-heading mb-4">
        How The Sustainability Fund Works
      </h2>
      <p className="mb-10 text-center section-body">
        From high-converting donation forms to growth through Savings and a
        Sustainability Fund, plus global fiscal sponsorship. {APP_NAME} is built
        by and for nonprofits. Free-no platform or fund-management fees.
      </p>

      <div className="grid xl:grid-cols-2 items-center mb-14 p-3 rounded-lg">
        <Image src={section_img} width={320} className="justify-self-center" />
        <div className="">
          <p className="border-b border-gray-l3 pb-2 text-2xl mb-4 mt-4 xl:mt-0 font-medium text-center xl:text-left">
            Investment Philosophy
          </p>
          <ul className="space-y-7">
            <li className="text-center xl:text-left">
              <span className="block font-semibold mb-1">
                50% Equity Exposure
              </span>{" "}
              <span className="text-gray-d1 xl:text-lg">
                benefit from the long-term growth potential of US and global
                markets
              </span>
            </li>
            <li className="text-center xl:text-left">
              <span className="block font-semibold b-1">
                30% Fixed Income Stability
              </span>{" "}
              <span className="text-gray-d1 xl:text-lg">
                cushion losses during market down-turns and generate steady
                income
              </span>
            </li>
            <li className="text-center xl:text-left">
              <span className="block font-semibold mb-1">
                15% Blockchain Assets
              </span>{" "}
              <span className="text-gray-d1 xl:text-lg">
                gain exposure to the emerging digital asset frontier
              </span>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-gray-d1 text-center mt-8 mb-4 max-w-2xl justify-self-center">
        <span className="font-bold">
          24% average annual return over the past 5 years*
        </span>{" "}
        <br />
        <span className="text-sm">
          (Five-year average; past performance not guaranteed)
        </span>
      </p>
      <p className="text-gray text-center max-w-2xl justify-self-center text-sm">
        Past performance is not indicative of future results. All investments
        carry risk, and the value of our portfolio may fluctuate. Our investment
        committee oversees and reviews our portfolio to ensure alignment with
        long-term financial goals, but returns cannot be guaranteed.
      </p>
    </section>
  );
}
