import boy_sleeping_in_hammock from "assets/landing/boy-sleeping-in-hammock.webp";
import man_going_out_of_box from "assets/landing/man-going-out-of-box.webp";
import { APP_NAME, BOOK_A_DEMO } from "constants/env";
import { motion } from "motion/react";
import { Link, href } from "react-router";

export function Ctas({ classes = "" }) {
  return (
    <section
      className={`${classes} grid gap-y-20 md:gap-y-32 py-14 md:py-28`}
      aria-label="Key benefits"
    >
      <article className="grid md:grid-cols-2 gap-x-4 items-center">
        <motion.div
          className="grid max-md:order-2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring" }}
        >
          <h3 className="text-2xl max-md:text-center md:text-3xl mb-2">
            Your gifts, your way.
          </h3>
          <p className="md:text-lg mb-4 max-md:text-center">
            Access funds anytime. Send gifts straight to your bank, earn 3–4% in
            savings, or grow long-term through our USCCB-aligned investment
            fund; your choice, flexible to your needs, and entirely free. No
            setup costs, AUM fees, or performance fees.
          </p>
          <div className="justify-self-center md:justify-self-start">
            <Link
              to={href("/register/welcome")}
              className="btn-blue inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded"
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
          src={man_going_out_of_box}
          className="justify-self-center max-md:mb-4"
          width={400}
        />
      </article>
      <article className="grid md:grid-cols-2 gap-x-4 items-center">
        <img
          src={boy_sleeping_in_hammock}
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
            Secure and compliant.
          </h3>
          <p className="md:text-lg mb-4 max-md:text-center">
            {APP_NAME}'s financial solutions are held in FDIC-insured bank
            accounts and regulated investment vehicles managed under nonprofit
            oversight. Our investment committee reviews all portfolios to ensure
            responsible, transparent stewardship.
          </p>
          <div className="justify-self-center md:justify-self-start">
            <Link
              to={href("/register/welcome")}
              className="btn-blue inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded"
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
    </section>
  );
}
