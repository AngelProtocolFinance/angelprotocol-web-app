import dot_map from "assets/images/map.webp";
import { APP_NAME } from "constants/env";
import { motion } from "motion/react";

export const Hero = ({ classes = "" }) => {
  return (
    <section
      className={`${classes} relative grid content-start pt-24`}
      aria-label="Hero section"
    >
      <motion.p
        className="pre-heading uppercase text-blue text-center mb-5 tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: 0.1 }}
      >
        Fiscal Sponsorship: Borderless Donations
      </motion.p>
      <motion.h1
        className="mx-auto capitalize hero-heading text-center mb-5 px-6 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        Globally Inclusive: Every Nonprofit Deserves Access, Wherever You Are
      </motion.h1>
      <motion.p
        className="px-6 font-medium section-body max-w-5xl mx-auto max-md:block text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: 0.3 }}
      >
        Access should never depend on budget or borders. Many international
        nonprofits struggle to receive U.S. tax-deductible donations —{" "}
        {APP_NAME} makes it simple.{" "}
        <span className="block mt-4">
          That’s why we offer fiscal sponsorship: a simple bridge that lets
          international nonprofits receive tax-deductible U.S. donations while
          we handle the legal and tax complexities for you.
        </span>
        <span className="block mt-4">
          Join our member-powered commons and unlock U.S. donor support without
          barriers.
        </span>
      </motion.p>

      <img
        className="absolute inset-x-0 max-lg:bottom-20 bottom-0 w-full mask-t-from-0.5"
        width={600}
        height={329.88}
        src={dot_map}
        alt="man using laptop"
      />
    </section>
  );
};
