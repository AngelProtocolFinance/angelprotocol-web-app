import { appRoutes } from "constants/routes";
import { benefits } from "content/benefits";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BenefitsCarousel from "./BenefitsCarousel";
import Carousel from "./Carousel";
import s from "./benefits.module.css";

type TPath = keyof typeof benefits;
const Path = () => {
  const [path] = useState<TPath>("nonprofits");

  return (
    <section
      className={`relative grid ${s.container} pt-20 pb-40 xl:pb-56 overflow-x-clip`}
    >
      <h3 className="text-[13px] md:text-[18px] uppercase text-blue-d1 text-center mb-4">
        Simplified Giving, Amplified Impact
      </h3>
      <h2 className="text-[32px] md:text-[42px] capitalize text-navy-d4 leading-snug text-center text-pretty mb-11">
        How Better Giving Powers Your Mission
      </h2>
      <p className="text-lg md:text-[28px] font-medium text-navy-l1/60 text-center mb-11">
        Your All-in-One Solution for Sustainable Fundraising and Financial
        Growth
      </p>

      <BenefitsCarousel slides={benefits[path]} classes="max-lg:hidden" />
      <Carousel slides={benefits[path]} classes="lg:hidden" />
      <Link
        to={
          path === "nonprofits"
            ? appRoutes.nonprofit_info
            : appRoutes.donor_info
        }
        className="mt-8 justify-self-center btn-blue normal-case items-center px-10 py-3 gap-1 rounded-full text-lg font-heading"
      >
        <span className="mr-1">Learn more</span>
        <ArrowRight size={18} />
      </Link>
    </section>
  );
};

export default Path;
