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

      <ul className="grid mt-4 mb-8 @container/rights md:grid-cols-2 lg:grid-cols-3 gap-4">
        <li className="grid gap-y-0 bg-white border border-lilac/30 p-4 rounded-lg content-start shadow-2xl shadow-lilac/40 grid-rows-subgrid row-span-7">
          <Sprout
            size={35}
            className="text-green shrink-0 justify-self-center"
          />
          <h5 className="text-center text-lg shrink-0 my-4">
            The Right to Financial Self-Sufficiency
          </h5>
          <p className="text-lg text-center mb-4">
            Every nonprofit deserves the opportunity to achieve financial
            self-sufficiency and resilience.
          </p>
          <p className="mt-6 mb-1 font-black text-navy-l1">This includes :</p>
          <ul className="space-y-3 mb-8 list-disc list-inside pl-2">
            <li className="text-navy-l1">
              The freedom to grow and manage sustainable financial reserves.
            </li>
            <li className="text-navy-l1">
              Access to tools that foster long-term financial stability.
            </li>
            <li className="text-navy-l1">
              The ability to diversify funding sources.
            </li>
          </ul>
          <p className="font-bold mb-2 mt-6 text-navy-l1">
            How we support this right :
          </p>
          <ul className="space-y-3 mb-8 list-disc list-inside pl-2">
            <li className="text-navy-l1">
              We offer a secure, high-yield savings account, enabling nonprofits
              to grow their funds steadily.
            </li>
            <li className="text-navy-l1">
              Our Sustainability Fund, with its 24% average annual return over
              the past five years, provides a path to long-term financial
              growth.
            </li>
            <li className="text-navy-l1">
              We provide free donation processing, allowing nonprofits to
              maximize every contribution.
            </li>
          </ul>
        </li>
        <li className="grid gap-y-0 bg-white border border-lilac/30 p-4 rounded-lg content-start shadow-2xl shadow-lilac/40 grid-rows-subgrid row-span-7">
          <Tally4
            size={28}
            className="text-navy shrink-0 justify-self-center"
          />
          <h5 className="text-center text-lg shrink-0 my-4">
            The Right to Equal Opportunity
          </h5>
          <p className="text-lg text-center mb-4">
            All nonprofits, regardless of size, location, or cause, should have
            equal access to fundraising technology, financial services, and
            education.
          </p>
          <p className="mt-6 mb-2 font-black text-navy-l1">
            This encompasses :
          </p>
          <ul className="space-y-3 mb-8 list-disc list-inside pl-2">
            <li className="text-navy-l1">
              Fair access to tools and resources that simplify fundraising.
            </li>
            <li className="text-navy-l1">
              Equal opportunity to reach diverse donor bases.
            </li>
            <li className="text-navy-l1">
              Access to educational resources for financial empowerment.
            </li>
          </ul>
          <p className="font-bold mb-2 mt-6 text-navy-l1">
            How we support this right :
          </p>
          <ul className="space-y-3 mb-8 list-disc list-inside pl-2">
            <li className="text-navy-l1">
              We offer unrestricted access to our platform for nonprofits of any
              size or location.
            </li>
            <li className="text-navy-l1">
              Our cost-leading fiscal sponsorship program helps international
              nonprofits access U.S. funding.
            </li>
            <li className="text-navy-l1">
              We provide free educational resources and webinars on digital
              fundraising and financial management.
            </li>
          </ul>
        </li>
        <li className="grid gap-y-0 bg-white border border-lilac/30 p-4 rounded-lg content-start shadow-2xl shadow-lilac/40 grid-rows-subgrid row-span-7 md:max-lg:col-span-2">
          <ShipWheel
            size={32}
            className="text-blue-d1 shrink-0 justify-self-center"
          />
          <h5 className="text-center text-lg shrink-0 my-4">
            The Right to Organizational Autonomy
          </h5>
          <p className="text-lg text-center mb-4">
            Nonprofits should have the independence to make decisions based on
            their mission and expertise.
          </p>
          <p className="mt-6 mb-1 font-black text-navy-l1">
            This right includes :
          </p>
          <ul className="space-y-3 mb-8 list-disc list-inside pl-2">
            <li className="text-navy-l1">
              The freedom to allocate funds according to organizational
              priorities.
            </li>
            <li className="text-navy-l1">
              Protection from excessive administrative burden.
            </li>
            <li className="text-navy-l1">
              The ability to innovate and adapt strategies.
            </li>
          </ul>
          <p className="font-bold mb-2 mt-6 text-navy-l1">
            How we support this right :
          </p>
          <ul className="space-y-3 mb-8 list-disc list-inside pl-2">
            <li className="text-navy-l1">
              We advocate for trust-based philanthropy, encouraging unrestricted
              funding practices.
            </li>
            <li className="text-navy-l1">
              As a nonprofit ourselves, we streamline away reporting and
              administration work by handling donation processing and fund
              management.
            </li>
            <li className="text-navy-l1">
              We provide flexible tools that adapt to each nonprofit’s unique
              needs and strategies.
            </li>
          </ul>
        </li>
      </ul>

      <p className="justify-self-center text-lg max-w-3xl text-center">
        At Better Giving, we envision a future where every nonprofit can fully
        exercise these rights—free from outdated systems and restrictive
        practices. We provide the tools and support you need to strengthen your
        financial future and achieve lasting impact.
      </p>
    </section>
  );
}
