import { blob } from "constants/urls";
import { motion } from "motion/react";

const logo_url = (num: number) => blob(`partners/${num}.svg`);

const partners = Array.from({ length: 76 }, (_, i) => ({
  id: i + 1,
  url: logo_url(i + 1),
}));

interface Props {
  classes?: string;
  of_what?: string;
}

export function Partners({
  classes = "",
  of_what = "nonprofits, faith charities, schools and universities",
}: Props) {
  return (
    <section
      className={`${classes} grid content-start`}
      aria-labelledby="partners-heading"
    >
      <motion.h2
        id="partners-heading"
        className="font-medium text-3xl/tight md:text-3.5xl/tight text-gray-d4 text-center text-balance mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring" }}
      >
        Join <span className="font-semibold text-blue">thousands</span> of{" "}
        {of_what}
      </motion.h2>

      <div className="justify-self-center relative overflow-hidden h-[400px]">
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>
        <motion.div
          style={{ y: 0 }}
          animate={{ y: "-50%" }}
          transition={{
            type: "tween",
            duration: 60,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {[...Array(2)].map((_, set_idx) => (
            <div
              key={set_idx}
              className="flex flex-wrap gap-8 py-4 justify-center"
            >
              {partners.map((partner) => (
                <img
                  key={`${set_idx}-${partner.id}`}
                  src={partner.url}
                  alt={`Partner ${partner.id}`}
                  width={80}
                  className="object-contain"
                  loading="lazy"
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
