import man_using_laptop from "assets/images/man-using-laptop.png";
import { motion } from "motion/react";

export const Hero = ({ classes = "" }) => {
  return (
    <section
      className={`${classes} relative grid py-24`}
      aria-label="Hero section"
    >
      <motion.p
        className="pre-heading uppercase text-blue text-center mb-5 tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: 0.1 }}
      >
        Fund Management Solutions
      </motion.p>
      <motion.h1
        className="mx-auto capitalize hero-heading text-center mb-8 px-6 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        Make Your Donations Work for You: <br />
        Automatic Savings & Growth
      </motion.h1>
      <motion.p
        className="px-6 font-medium section-body max-w-5xl mx-auto max-md:block text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: 0.3 }}
      >
        Your donors trust you with their gifts. Now you can trust those funds to
        grow safely earning high-yield interest while remaining accessible
        whenever your nonprofit needs them.
      </motion.p>

      <img
        className="mt-8 justify-self-center rounded-2xl"
        width={600}
        height={329.88}
        src={man_using_laptop}
        alt="man using laptop"
      />
    </section>
  );
};
