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
  const [path, setPath] = useState<TPath>("nonprofits");

  return (
    <section
      className={`relative grid ${s.container} pb-40 xl:pb-56 overflow-x-clip`}
    >
      <h3 className="text-[13px] md:text-[18px] uppercase text-blue-d1 text-center mb-4">
        Bridge to better
      </h3>
      <h2 className="text-[32px] md:text-[42px] capitalize text-navy-d4 leading-snug text-center text-pretty mb-11">
        Amplifying impact for all
      </h2>
      <div className="flex p-1 bg-[#F6EFE5] font-medium rounded-3xl gap-2 justify-self-center mb-11">
        <button
          type="button"
          className={`${
            path === "nonprofits" ? "bg-white" : "bg-transparent"
          } py-2 px-6 rounded-3xl`}
          onClick={() => {
            setPath("nonprofits");
          }}
        >
          For Nonprofits
        </button>
        <button
          type="button"
          className={`${
            path === "donors" ? "bg-white" : "bg-transparent"
          } py-2 px-6 rounded-3xl`}
          onClick={() => setPath("donors")}
        >
          For Donors
        </button>
      </div>
      <p className="text-lg md:text-[28px] font-medium text-navy-l1/60 text-center mb-11">
        {path === "nonprofits"
          ? "Join our global community and amplify your charitable giving."
          : "Access our free fundraising technology and tools."}
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
