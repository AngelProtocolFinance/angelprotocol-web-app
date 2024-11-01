import { ShipWheel, Sprout, Tally4 } from "lucide-react";

export function Manifesto({ className = "" }) {
  return (
    <section className={`${className} grid pb-40`}>
      <h2 className="col-span-full text-center text-3xl md:text-4.5xl leading-snug">
        The Better Giving Manifesto
      </h2>
      <p className="text-navy text-center mb-8 col-span-full text-xl mt-4 max-w-3xl justify-self-center">
        Nonprofits are the champions of societal change, addressing the world’s
        most pressing challenges. But they often face barriers like outdated
        systems, restrictive funding, and limited access to financial tools. At
        Better Giving, we’re committed to breaking down these barriers.
      </p>

      <p className="text-xl font-bold text-center text-blue-d1 mb-4">
        We believe in these fundamental rights for all nonprofits :
      </p>

      <ul className="grid mt-4 mb-8 @container/rights">
        <li className="max-md:w-full gap-y-4 p-4">
          <div className="grid @lg/rights:grid-cols-[1fr_auto_1fr] gap-x-2 items-center mb-6">
            <div className="bg-gradient-to-l hidden @lg/rights:block from-green-l1 to-transparent h-2 rounded-full shadow-inner" />
            <div className="flex flex-col @lg/rights:flex-row items-center gap-2">
              <Sprout size={35} className="text-green shrink-0" />
              <h5 className="text-lg shrink-0">
                The Right to Financial Self-Sufficiency
              </h5>
            </div>
            <div className="bg-gradient-to-r hidden @lg/rights:block from-green-l1 to-transparent h-2 w-full rounded-full shadow-inner" />
          </div>
          <p className="text-lg text-center">
            Every nonprofit deserves the opportunity to achieve financial
            self-sufficiency and resilience.
          </p>
          <p className="text-center mt-4 font-black mb-4 text-navy-l1">
            This includes :
          </p>
          <ul className="space-y-1 mb-8">
            <li className="text-navy-l1 text-center">
              The freedom to grow and manage sustainable financial reserves.
            </li>
            <li className="text-navy-l1 text-center">
              Access to tools that foster long-term financial stability.
            </li>
            <li className="text-navy-l1 text-center">
              The ability to diversify funding sources.
            </li>
          </ul>
          <p className="font-bold text-center mt-4 mb-4 text-navy-l1">
            How we support this right :
          </p>
          <ul className="space-y-1 mb-8">
            <li className="text-navy-l1 text-center">
              We offer a secure, high-yield savings account, enabling nonprofits
              to grow their funds steadily.
            </li>
            <li className="text-navy-l1 text-center">
              Our Sustainability Fund, with its 24% average annual return over
              the past five years, provides a path to long-term financial
              growth.
            </li>
            <li className="text-navy-l1 text-center">
              We provide free donation processing, allowing nonprofits to
              maximize every contribution.
            </li>
          </ul>
        </li>
        <li className="max-md:w-full gap-y-4 p-4">
          <div className="grid @lg/rights:grid-cols-[1fr_auto_1fr] gap-x-2 items-center mb-6">
            <div className="bg-gradient-to-l hidden @lg/rights:block from-gray-l4 to-transparent h-2 rounded-full shadow-inner" />
            <div className="flex flex-col @lg/rights:flex-row items-center gap-2">
              <Tally4 size={28} className="text-navy shrink-0" />
              <h5 className="text-lg shrink-0">
                The Right to Equal Opportunity
              </h5>
            </div>
            <div className="bg-gradient-to-r hidden @lg/rights:block from-gray-l4 to-transparent h-2 w-full rounded-full shadow-inner" />
          </div>

          <p className="text-lg text-center">
            All nonprofits, regardless of size, location, or cause, should have
            equal access to fundraising technology, financial services, and
            education.
          </p>
          <p className="text-center mt-4 font-black mb-4 text-navy-l1">
            This encompasses :
          </p>
          <ul className="space-y-1 mb-8">
            <li className="text-navy-l1 text-center">
              Fair access to tools and resources that simplify fundraising.
            </li>
            <li className="text-navy-l1 text-center">
              Equal opportunity to reach diverse donor bases.
            </li>
            <li className="text-navy-l1 text-center">
              Access to educational resources for financial empowerment.
            </li>
          </ul>
          <p className="font-bold text-center mt-4 mb-4 text-navy-l1">
            How we support this right :
          </p>
          <ul className="space-y-1 mb-8">
            <li className="text-navy-l1 text-center">
              We offer unrestricted access to our platform for nonprofits of any
              size or location.
            </li>
            <li className="text-navy-l1 text-center">
              Our cost-leading fiscal sponsorship program helps international
              nonprofits access U.S. funding.
            </li>
            <li className="text-navy-l1 text-center">
              We provide free educational resources and webinars on digital
              fundraising and financial management.
            </li>
          </ul>
        </li>
        <li className="max-md:w-full gap-y-4 p-4">
          <div className="grid @lg/rights:grid-cols-[1fr_auto_1fr] gap-x-2 items-center mb-6">
            <div className="bg-gradient-to-l hidden @lg/rights:block from-blue-d1 to-transparent h-2 rounded-full shadow-inner" />
            <div className="flex flex-col @lg/rights:flex-row items-center gap-2">
              <ShipWheel size={32} className="text-blue-d1 shrink-0" />
              <h5 className="text-lg shrink-0">
                The Right to Organizational Autonomy
              </h5>
            </div>
            <div className="bg-gradient-to-r hidden @lg/rights:block from-blue-d1 to-transparent h-2 w-full rounded-full shadow-inner" />
          </div>
          <p className="text-lg text-center text-blue-d4">
            Nonprofits should have the independence to make decisions based on
            their mission and expertise.
          </p>
          <p className="text-center mt-4 font-black mb-4 text-navy-l1">
            This right includes :
          </p>
          <ul className="space-y-1 mb-8">
            <li className="text-navy-l1 text-center">
              The freedom to allocate funds according to organizational
              priorities.
            </li>
            <li className="text-navy-l1 text-center">
              Protection from excessive administrative burden.
            </li>
            <li className="text-navy-l1 text-center">
              The ability to innovate and adapt strategies.
            </li>
          </ul>
          <p className="font-bold text-center mt-4 mb-4 text-navy-l1">
            How we support this right :
          </p>
          <ul className="space-y-1 mb-8">
            <li className="text-navy-l1 text-center">
              We advocate for trust-based philanthropy, encouraging unrestricted
              funding practices.
            </li>
            <li className="text-navy-l1 text-center">
              As a nonprofit ourselves, we streamline away reporting and
              administration work by handling donation processing and fund
              management.
            </li>
            <li className="text-navy-l1 text-center">
              We provide flexible tools that adapt to each nonprofit’s unique
              needs and strategies.
            </li>
          </ul>
        </li>
      </ul>

      <p className="justify-self-center text-lg max-w-3xl text-center mt-10 border-t border-gray-l4 pt-8">
        At Better Giving, we envision a future where every nonprofit can fully
        exercise these rights—free from outdated systems and restrictive
        practices. We provide the tools and support you need to strengthen your
        financial future and achieve lasting impact.
      </p>
    </section>
  );
}
