import banner from "assets/images/bg-banner.png";
import { motion } from "motion/react";
import { Link, href } from "react-router";

const MLink = motion.create(Link);

export const Hero = ({ classes = "" }) => {
  return (
    <section
      className={`${classes} relative grid pt-36 pb-48 sm:pb-96`}
      aria-label="Hero section"
    >
      <div
        className="absolute inset-0 -z-10 mask-b-from-1% bg-cover bg-no-repeat bg-[center_-10%] xl:bg-[center_bottom]"
        style={{ backgroundImage: `url('${banner}')` }}
        role="presentation"
        aria-hidden="true"
      />
      <motion.p
        className="pre-heading uppercase text-center mb-5 tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: 0.1 }}
      >
        By a nonprofit, for the Church
      </motion.p>
      <motion.h1
        className="mx-auto capitalize hero-heading text-center mb-8 px-6 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        Increase Catholic giving, <br /> grow funds faithfully
      </motion.h1>
      <motion.p
        className="px-6 font-medium text-gray-d1 max-w-5xl mx-auto max-md:block md:text-2xl text-center sm:text-balance"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: 0.3 }}
      >
        Grow mission capacity with a high-converting giving form that lifts
        completed gifts and recurring support. Steward wisely with high-yield
        savings and a USCCB-aligned investment fund. Simple setup, free forever.
      </motion.p>

      <MLink
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: 0.4 }}
        to={href("/register/welcome")}
        className="justify-self-center mt-8 btn-blue active:translate-x-1 items-center font-bold shadow-2xl inline-flex px-10 py-3 gap-1 rounded-full text-lg "
      >
        Sign Up Now
      </MLink>
    </section>
  );
};
