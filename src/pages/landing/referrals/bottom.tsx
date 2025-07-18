import { Link } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { ArrowRight } from "lucide-react";

export function Bottom({ classes = "" }) {
  return (
    <section
      className={`${classes} grid bg-gradient-to-tl from-white to-blue-d1 rounded-xl md:py-20 md:px-6 p-6`}
    >
      <h2 className="text-2xl/tight md:text-3xl/tight text-center mb-4 text-white">
        Join Us - Start Making an Impact Today!
      </h2>
      <p className="px-6 max-w-5xl mx-auto text-white md:text-xl text-center text-pretty mb-6">
        Whether you're a consultant, a fundraiser, or simply someone who loves
        making a difference, Better Giving lets you turn your connections into a
        force for good.
      </p>
      <Link
        to={`${appRoutes.signup}?redirect=${appRoutes.user_dashboard}/referrals`}
        className="btn-blue text-balance justify-self-center w-fit mx-auto group active:translate-x-1 font-bold shadow-2xl inline-flex items-center px-10 py-3 gap-1 rounded-full text-lg font-heading"
      >
        Get Your Referral Link Now
        <ArrowRight size={18} className="group-hover:translate-x-1 shrink-0" />
      </Link>
    </section>
  );
}
