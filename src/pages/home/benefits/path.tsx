import { app_routes } from "constants/routes";
import { benefits } from "content/benefits";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import BenefitsCarousel from "./benefits-carousel";
import Carousel from "./carousel";

type TPath = keyof typeof benefits;
const Path = () => {
  const [path] = useState<TPath>("nonprofits");

  return (
    <section
      className={
        "relative grid pt-50 pb-40 xl:pb-56  bg-gradient-to-b from-peach/20 to-transparent"
      }
    >
      <h2 className="text-sm md:text-lg uppercase text-blue-d1 text-center mb-4">
        Bridge To Better
      </h2>
      <h3 className="text-3xl md:text-4.5xl capitalize text-gray-d4 leading-snug text-center text-balance mb-11">
        Why Choose Better Giving
      </h3>
      <p className="text-lg md:text-2xl font-medium text-gray/60 text-center mb-11">
        Your All-in-One Solution for Sustainable Fundraising and Financial
        Growth
      </p>

      <BenefitsCarousel slides={benefits[path]} classes="max-lg:hidden" />
      <Carousel slides={benefits[path]} classes="lg:hidden" />
      <Link
        to={
          path === "nonprofits"
            ? app_routes.nonprofit_info
            : app_routes.donor_info
        }
        className="btn-blue mt-8 group justify-self-center flex items-center px-10 py-3 gap-1 text-lg group active:translate-x-1  font-bold shadow-2xl rounded-full"
      >
        <span className="mr-1">Learn more</span>
        <ArrowRight size={18} className="group-hover:translate-x-1" />
      </Link>
    </section>
  );
};

export default Path;
