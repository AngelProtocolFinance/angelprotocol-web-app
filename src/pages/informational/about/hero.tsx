import { Link } from "@remix-run/react";
import { laira } from "assets/laira/laira";
import { appRoutes } from "constants/routes";
import { ArrowRight } from "lucide-react";

export function Hero({ classes = "" }) {
  return (
    <section className={`${classes} grid pb-48 pt-32`}>
      <p className="text-blue-d1 text-sm md:text-lg font-heading uppercase font-bold text-center mb-5 tracking-wider">
        No nonprofit left behind
      </p>
      <h1 className="mx-auto text-3xl/tight md:text-4xl/tight lg:text-4.5xl/tight text-center text-balance   mb-10 mt-4 px-6">
        Nonprofits deserve a more inclusive and sustainable model of
        philanthropy
      </h1>
      <p className="px-6 text-gray-d1 max-md:block md:text-2xl text-center text-balance max-w-4xl justify-self-center sm:text-balance">
        At Better Giving, we’re committed to breaking down the financial
        barriers that nonprofits face. Through free donation processing,
        savings, and investment tools, we equip nonprofits with the resources
        they need to create impact not only today, but long into the future.
      </p>

      <Link
        to={appRoutes.register}
        className="mt-10 isolate justify-self-center normal-case inline-flex items-center px-10 py-3 gap-1 rounded-full text-lg font-heading relative bg-blue-d1 group active:translate-x-1 text-white font-bold shadow-2xl"
      >
        <span className="ml-1 text-center">
          Join the Fundraising Revolution
        </span>
        <ArrowRight size={18} className="group-hover:translate-x-1" />
      </Link>

      <div className="flex justify-between lg:-mt-20 max-sm:hidden">
        <img
          src={laira.yellow}
          width={90}
          alt="laira looking up"
          className="object-contain"
        />
        <img src={laira.negotiating} className="object-contain" />
      </div>
    </section>
  );
}
