import { motion } from "motion/react";
import { Link, href } from "react-router";
import cta_1 from "./cta-1.svg";
import cta_2 from "./cta-2.svg";
import cta_3 from "./cta-3.svg";
import cta_4 from "./cta-4.svg";

interface IBlurImg {
  classes?: string;
  url: string;
  index?: number;
}
function BlurImg({ classes, url, index = 0 }: IBlurImg) {
  return (
    <motion.img
      className={`${classes} relative size-72`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", delay: index * 0.1 }}
      role="presentation"
      aria-hidden="true"
      width={400}
      src={url}
    />
  );
}

export function Ctas({ classes = "" }) {
  return (
    <section
      className={`${classes} grid gap-y-20 md:gap-y-32 px-5 md:px-24`}
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
          <h3 className="max-md:text-center article-heading text-blue mb-2">
            We help you raise more.
          </h3>
          <p className="md:text-lg mb-4 max-md:text-center">
            <span className="font-bold">Conversion-optimized gift flow</span>:
            fewer clicks, express checkout, all gift types in one form—plus easy
            embedding to lift completion and grow recurring givers. Label funds
            as needed for Offertory, Second Collections, Appeals, Building Fund,
            School, Ministries, etc.
          </p>
          <Link
            to={href("/register/welcome")}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded"
          >
            Sign Up Now
          </Link>
        </motion.div>
        <BlurImg
          url={cta_1}
          classes="justify-self-center max-md:mb-4"
          index={0}
        />
      </article>
      <article className="grid md:grid-cols-2 items-center">
        <BlurImg
          url={cta_2}
          classes="justify-self-center max-md:mb-4"
          index={1}
        />
        <motion.div
          className="grid"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring" }}
        >
          <h3 className="text-2xl md:text-3xl text-blue mb-2 max-md:text-center">
            We grow what you raise.
          </h3>
          <p className="md:text-lg mb-4 max-md:text-center">
            <span className="font-bold">Let your gifts work for you</span>:
            High-yield savings (FDIC-insured) and a USCCB-aligned investment
            option averaging over 24% annually across the last 5 years (past
            performance isn't guaranteed).
          </p>
          <Link
            to={href("/register/welcome")}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded"
          >
            Sign Up Now
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
          <h3 className="max-md:text-center article-heading text-blue mb-2">
            We unlock larger gifts.
          </h3>
          <p className="md:text-lg mb-4 max-md:text-center">
            <span className="font-bold">Stop turning donors away</span>: Accept
            stock, crypto and DAF gifts in the same secure flow—no extra
            systems, no added admin, no extra cost, just cash in your bank
            account and tax benefits for your donors.
          </p>
          <Link
            to={href("/register/welcome")}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded"
          >
            Sign Up Now
          </Link>
        </motion.div>
        <BlurImg
          url={cta_3}
          classes="justify-self-center max-md:mb-4"
          index={2}
        />
      </article>
      <article className="grid md:grid-cols-2 items-center">
        <BlurImg
          url={cta_4}
          classes="justify-self-center max-md:mb-4"
          index={3}
        />
        <motion.div
          className="grid"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring" }}
        >
          <h3 className="text-2xl md:text-3xl text-blue mb-2 max-md:text-center">
            We don't take a cut.
          </h3>
          <p className="md:text-lg mb-4 max-md:text-center">
            <span className="font-bold">
              Entirely free, all features included
            </span>
            : Processing is funded by optional donor infrastructure gifts at
            checkout so you don't pay platform fees or fund-management fees.
          </p>
          <Link
            to={href("/register/welcome")}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded"
          >
            Sign Up Now
          </Link>
        </motion.div>
      </article>
    </section>
  );
}

interface ICta {
  classes?: string;
}

export function Cta({ classes = "" }: ICta) {
  return (
    <div className={`${classes} grid md:grid-cols-2 items-center`}>
      <div className="grid order-2">
        <h4 className="text-2xl md:text-3xl text-blue mb-2">
          We help you raise more
        </h4>
        <p className="md:text-lg mb-4">
          <span className="font-bold">Conversion-optimized donation flow</span>:
          fewer clicks, express checkout, all gift types in one form—plus easy
          embedding to lift completion and grow monthly donors.
        </p>
        <Link
          to={href("/register/welcome")}
          className="btn-blue justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded"
        >
          Sign Up Now
        </Link>
      </div>
      <div className="relative order-1">
        <img
          width={320}
          src={cta_4}
          className="rounded justify-self-center absolute-center blur-xl"
        />
        <img
          width={220}
          src={cta_4}
          className="z-10 rounded justify-self-center absolute-center"
        />
      </div>
    </div>
  );
}
