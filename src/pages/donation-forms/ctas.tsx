import { blob } from "constants/urls";
import { motion } from "motion/react";
import { Link, href } from "react-router";

const images = Array.from({ length: 4 }, (_, i) =>
  blob(`donation-form-cta-${i + 1}.png`)
);

export function Ctas({ classes = "" }) {
  return (
    <section
      className={`${classes} grid gap-y-20 md:gap-y-32 px-5 md:px-24 py-16`}
      aria-label="Key benefits"
    >
      <article className="grid md:grid-cols-2 items-center">
        <motion.div
          className="grid max-md:order-2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring" }}
        >
          <h3 className="text-2xl max-md:text-center md:text-3xl mb-2">
            More completed gifts.
          </h3>
          <p className="md:text-lg mb-4 max-md:text-center">
            Our conversion-optimized donation flow and best-in-class form ensure
            a simple process for your donors, resulting in more completed gifts
            and more recurring donors.
          </p>
          <Link
            to={href("/register/welcome")}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded-full"
          >
            Join us today!
          </Link>
        </motion.div>
        <img
          src={images[0]}
          className="justify-self-center max-md:mb-4"
          width={400}
        />
      </article>
      <article className="grid md:grid-cols-2 items-center">
        <img
          src={images[1]}
          className="justify-self-center max-md:mb-4"
          width={400}
        />
        <motion.div
          className="grid"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring" }}
        >
          <h3 className="text-2xl md:text-3xl mb-2 max-md:text-center">
            Never miss a donation.
          </h3>
          <p className="md:text-lg mb-4 max-md:text-center">
            Accept card, bank, stock, crypto, and DAF gifts in one seamless flow
            with no extra tools or portals. Every option is included so you
            capture more, and larger, gifts automatically.
          </p>
          <Link
            to={href("/register/welcome")}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded-full"
          >
            Join us today!
          </Link>
        </motion.div>
      </article>
      <article className="grid md:grid-cols-2 items-center">
        <motion.div
          className="grid max-md:order-2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring" }}
        >
          <h3 className="text-2xl max-md:text-center md:text-3xl mb-2">
            Make it yours.
          </h3>
          <p className="md:text-lg mb-4 max-md:text-center">
            Match your brand with custom colors, language, and easy website
            integration. Branded tax receipts and thank you messages are
            included automatically, building donor relationships and
            establishing trust.
          </p>
          <Link
            to={href("/register/welcome")}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded-full"
          >
            Join us today!
          </Link>
        </motion.div>
        <img
          src={images[2]}
          className="justify-self-center max-md:mb-4"
          width={400}
        />
      </article>
      <article className="grid md:grid-cols-2 items-center">
        <img
          src={images[3]}
          className="justify-self-center max-md:mb-4"
          width={400}
        />
        <motion.div
          className="grid"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring" }}
        >
          <h3 className="text-2xl md:text-3xl mb-2 max-md:text-center">
            Grow your impact.
          </h3>
          <p className="md:text-lg mb-4 max-md:text-center">
            Put your donations to work automatically; earn 3-4% in FDIC-insured
            savings or choose our Sustainability Fund for long-term growth.
            Either way, your funds stay accessible and productive.
          </p>
          <Link
            to={href("/register/welcome")}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded-full"
          >
            Join us today!
          </Link>
        </motion.div>
      </article>
    </section>
  );
}
