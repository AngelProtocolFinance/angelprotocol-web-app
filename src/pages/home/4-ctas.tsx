import girl_pointing_up from "assets/landing/girl-pointing-up.webp";
import girl_using_phone from "assets/landing/girl-using-phone.webp";
import girl_watering_plant from "assets/landing/girl-watering-plant.webp";
import hand_payment_methods from "assets/landing/hand-payment-methods.webp";
import { motion } from "motion/react";
import { Link, href } from "react-router";

interface IBlurImg {
  classes?: string;
  url: string;
  index?: number;
}
function BlurImg({ classes, url, index = 0 }: IBlurImg) {
  return (
    <motion.div
      className={`${classes} relative w-64 h-64`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", delay: index * 0.1 }}
      role="presentation"
      aria-hidden="true"
    >
      <img
        width={400}
        src={url}
        className="rounded-full absolute-center blur-2xl"
        alt=""
      />
      <img
        width={240}
        src={url}
        className="z-10 rounded-full absolute-center"
        alt=""
      />
    </motion.div>
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
            <span className="font-semibold">
              Conversion-optimized donation flow
            </span>
            : fewer clicks, express checkout, all gift types in one form—plus
            easy embedding to lift completion and grow monthly donors.
          </p>
          <Link
            to={href("/register/welcome")}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-semibold shadow-2xl rounded-full"
          >
            Join us today!
          </Link>
        </motion.div>
        <BlurImg
          url={girl_pointing_up}
          classes="justify-self-center max-md:mb-4"
          index={0}
        />
      </article>
      <article className="grid md:grid-cols-2 items-center">
        <BlurImg
          url={girl_watering_plant}
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
            <span className="font-semibold">
              Let your donations work for you
            </span>
            : High-yield savings (FDIC-insured) and a managed option averaging
            over 20% annually across the last 5 years (past performance isn't
            guaranteed).
          </p>
          <Link
            to={href("/register/welcome")}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-semibold shadow-2xl rounded-full"
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
          <h3 className="max-md:text-center article-heading text-blue mb-2">
            We unlock larger gifts.
          </h3>
          <p className="md:text-lg mb-4 max-md:text-center">
            <span className="font-semibold">Stop turning donors away</span>:
            Accept stock & crypto in the same secure flow—no extra systems, no
            added admin, no extra cost, just cash in your bank account and tax
            benefits for your donors.
          </p>
          <Link
            to={href("/register/welcome")}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-semibold shadow-2xl rounded-full"
          >
            Join us today!
          </Link>
        </motion.div>
        <BlurImg
          url={hand_payment_methods}
          classes="justify-self-center max-md:mb-4"
          index={2}
        />
      </article>
      <article className="grid md:grid-cols-2 items-center">
        <BlurImg
          url={girl_using_phone}
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
            <span className="font-semibold">
              Entirely free, all features included
            </span>
            : Processing is funded by optional donor infrastructure gifts at
            checkout so you don't pay platform fees or fund-management fees.
          </p>
          <Link
            to={href("/register/welcome")}
            className="btn-blue justify-self-center md:justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-semibold shadow-2xl rounded-full"
          >
            Join us today!
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
          <span className="font-semibold">
            Conversion-optimized donation flow
          </span>
          : fewer clicks, express checkout, all gift types in one form—plus easy
          embedding to lift completion and grow monthly donors.
        </p>
        <Link
          to={href("/register/welcome")}
          className="btn-blue justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-semibold shadow-2xl rounded-full"
        >
          Join us today!
        </Link>
      </div>
      <div className="relative order-1">
        <img
          width={320}
          src={girl_pointing_up}
          className="rounded-full justify-self-center absolute-center blur-xl"
        />
        <img
          width={220}
          src={girl_pointing_up}
          className="z-10 rounded-full justify-self-center absolute-center"
        />
      </div>
    </div>
  );
}
