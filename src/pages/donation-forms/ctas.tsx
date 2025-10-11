import girl_pointing_up from "assets/landing/girl-pointing-up.webp";
import girl_using_phone from "assets/landing/girl-using-phone.webp";
import girl_watering_plant from "assets/landing/girl-watering-plant.webp";
import hand_payment_methods from "assets/landing/hand-payment-methods.webp";
import { motion } from "motion/react";
import { Link, href } from "react-router";

interface Iimg {
  classes?: string;
  url: string;
  index?: number;
}
function img({ classes, url, index = 0 }: Iimg) {
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
          src={girl_pointing_up}
          className="justify-self-center max-md:mb-4"
          width={400}
        />
      </article>
      <article className="grid md:grid-cols-2 items-center">
        <img
          src={girl_watering_plant}
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
          src={hand_payment_methods}
          className="justify-self-center max-md:mb-4"
          width={400}
        />
      </article>
      <article className="grid md:grid-cols-2 items-center">
        <img
          src={girl_using_phone}
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
          className="btn-blue justify-self-start inline-flex items-center px-10 py-3 active:translate-x-1 font-bold shadow-2xl rounded-full"
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
