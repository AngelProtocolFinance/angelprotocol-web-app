import { ShipWheel, Sprout, Tally4 } from "lucide-react";

export function Manifesto({ className = "" }) {
  return (
    <section className={`${className} grid pb-40`}>
      <h2 className="col-span-full text-center text-4.5xl leading-snug">
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

      <ul className="flex flex-wrap sm:justify-center gap-4 mt-4 mb-8">
        <li className="max-md:w-full pb-8 grid justify-items-center bg-white rounded shadow-2xl shadow-lilac gap-y-4 p-4 border-lilac border text-center font-heading font-black">
          <Sprout size={40} className="text-green" />
          <span className="text-lg">
            The Right to Financial Self-Sufficiency
          </span>
        </li>
        <li className="max-md:w-full pb-8 grid justify-items-center bg-white rounded shadow-2xl shadow-lilac gap-y-4 p-4 border-lilac border text-center font-heading font-black">
          <Tally4 size={35} className="text-navy" />
          <span className="text-lg">The Right to Equal Opportunity</span>
        </li>
        <li className="max-md:w-full pb-8 grid justify-items-center bg-white rounded shadow-2xl shadow-lilac gap-y-4 p-4 border-lilac border text-center font-heading font-black">
          <ShipWheel size={40} className="text-blue-d1" />
          <span className="text-lg">The Right to Organizational Autonomy</span>
        </li>
      </ul>

      <p className="text-lg max-w-3xl text-center justify-self-center mt-10">
        At Better Giving, we envision a future where every nonprofit can fully
        exercise these rights—free from outdated systems and restrictive
        practices. We provide the tools and support you need to strengthen your
        financial future and achieve lasting impact.
      </p>
    </section>
  );
}
