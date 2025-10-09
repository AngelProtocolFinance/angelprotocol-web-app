import laira_shake_hands_x2 from "assets/laira/laira-shaking-hands-x2.webp";
import laira_yellow from "assets/laira/laira-yellow.webp";
import { ArrowRight } from "lucide-react";
import { Link, href } from "react-router";

export function Hero({ classes = "" }) {
  return (
    <section className={`${classes} grid pb-48 pt-32`}>
      <p className="text-blue-d1 text-sm md:text-lg  uppercase font-bold text-center mb-5 tracking-wider">
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
        to={href("/register/welcome")}
        className="btn-blue mt-10 isolate justify-self-center inline-flex items-center px-10 py-3 gap-1 rounded-full text-lg  relative group active:translate-x-1 font-bold shadow-2xl"
      >
        <span className="ml-1 text-center">
          Join the Fundraising Revolution
        </span>
        <ArrowRight size={18} className="group-hover:translate-x-1" />
      </Link>

      <div className="flex justify-between lg:-mt-20 max-sm:hidden">
        <img
          src={laira_yellow}
          width={90}
          alt="laira looking up"
          className="object-contain"
        />
        <img
          src={laira_shake_hands_x2}
          width={150}
          className="object-contain"
        />
      </div>
    </section>
  );
}
