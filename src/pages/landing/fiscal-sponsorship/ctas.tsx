import { BOOK_A_DEMO } from "constants/env";
import { blob } from "constants/urls";
import { motion } from "motion/react";
import { Link, href } from "react-router";

const images = [blob("fsa-1.png"), blob("fsa-2.png"), blob("fsa-3.png")];

export function Ctas({ classes = "" }) {
  return (
    <section
      className={`${classes} grid gap-y-20 md:gap-y-32 py-14 md:py-28`}
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
            Global nonprofits, local benefits.
          </h3>
          <p className="md:text-lg mb-4 max-md:text-center">
            Wherever your nonprofit is based, Better Giving connects you with
            U.S. tax-exempt benefits and donor networks helping your mission
            grow without borders.
          </p>
          <div className="justify-self-center md:justify-self-start">
            <Link
              to={href("/register/welcome")}
              className="btn-blue inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded-full"
            >
              Sign Up Now
            </Link>
            <div className="md:ml-3 max-md:text-center mt-2">
              or,{" "}
              <Link
                target="_blank"
                to={BOOK_A_DEMO}
                className="text-sm indent-3 mt-2 underline hover:text-blue-d1"
              >
                get a demo
              </Link>
            </div>
          </div>
        </motion.div>
        <img
          src={images[1]}
          className="justify-self-center max-md:mb-4 scale-150 -z-10"
          width={400}
        />
      </article>
      <article className="grid md:grid-cols-2 items-center">
        <img
          src={images[0]}
          className="justify-self-center max-md:mb-4 scale-150 -z-10"
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
            Compliance you can trust.
          </h3>
          <p className="md:text-lg mb-4 max-md:text-center">
            We manage all IRS reporting, financial oversight, and legal
            requirements so your nonprofit stays compliant with transparency you
            can trust and no extra admin.
          </p>
          <div className="justify-self-center md:justify-self-start">
            <Link
              to={href("/register/welcome")}
              className="btn-blue inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded-full"
            >
              Sign Up Now
            </Link>
            <div className="md:ml-3 max-md:text-center mt-2">
              or,{" "}
              <Link
                target="_blank"
                to={BOOK_A_DEMO}
                className="text-sm indent-3 mt-2 underline hover:text-blue-d1"
              >
                get a demo
              </Link>
            </div>
          </div>
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
            Local giving, global reach.
          </h3>
          <p className="md:text-lg mb-4 max-md:text-center">
            Better Giving supports localized payments, letting donors give using
            their preferred methods — cards, wallets, and bank transfers, all in
            their home currency. Every gift is processed securely, ensuring a
            seamless experience for donors anywhere in the world.
          </p>
          <div className="justify-self-center md:justify-self-start">
            <Link
              to={href("/register/welcome")}
              className="btn-blue inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded-full"
            >
              Sign Up Now
            </Link>
            <div className="md:ml-3 max-md:text-center mt-2">
              or,{" "}
              <Link
                target="_blank"
                to={BOOK_A_DEMO}
                className="text-sm indent-3 mt-2 underline hover:text-blue-d1"
              >
                get a demo
              </Link>
            </div>
          </div>
        </motion.div>
        <img
          src={images[2]}
          className="justify-self-center max-md:mb-4 scale-150 -z-10"
          width={400}
        />
      </article>
    </section>
  );
}
