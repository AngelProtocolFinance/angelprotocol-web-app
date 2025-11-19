import { motion } from "motion/react";
import { Stats } from "./stats";

interface Props {
  classes?: string;
  of_what?: string;
}

export function Partners({
  classes = "",
  of_what = "Catholic parishes, schools, dioceses, and ministries worldwide",
}: Props) {
  return (
    <section
      className={`${classes} grid content-start`}
      aria-labelledby="partners-heading"
    >
      <motion.h2
        id="partners-heading"
        className="font-medium section-heading  text-gray-d4 text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring" }}
      >
        Join <span className="font-semibold text-blue">thousands</span> of{" "}
        {of_what}
      </motion.h2>

      <Stats classes="mt-4" />
    </section>
  );
}
