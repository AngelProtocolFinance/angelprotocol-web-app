import laira1 from "assets/laira/laira1.png";
import laira2 from "assets/laira/laira2.png";
import laira3 from "assets/laira/laira3.png";
import { Image } from "components/image";
import { APP_NAME, BOOK_A_DEMO } from "constants/env";
import { motion } from "motion/react";
import { Link, href } from "react-router";

type TListItem = {
  title1: string;
  title2: string;
  description: string;
  image: { src: string; width?: number; height?: number; alt: string };
};
const items: TListItem[] = [
  {
    title1: "Step 1",
    title2: "Sign up",
    description: `Join ${APP_NAME} — free, no platform or fund-management fees.`,
    image: { src: laira1, width: 95, alt: "Laira holding number 1" },
  },
  {
    title1: "Step 2",
    title2: "Add the donation form ",
    description:
      "Fewer clicks + more donation types + express checkout = more completed gifts and monthly donors.",
    image: { src: laira2, width: 95, alt: "Laira holding number 2" },
  },
  {
    title1: "Step 3",
    title2: "Grow",
    description:
      "Let your hard earned donations work for you with passive high-yield savings & managed investments.",
    image: { src: laira3, width: 115, alt: "Laira holding number 3" },
  },
];

export function Steps({ classes = "" }) {
  return (
    <section className={`${classes} grid content-start `}>
      <motion.h3
        className="text-center text-3xl section-heading mb-6 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring" }}
      >
        Easy as 1-2-3
      </motion.h3>

      <ul className="mt-20 lg:divide-x divide-gray-l3 grid gap-y-20 lg:gap-y-0 lg:grid-cols-3">
        {items.map((item, idx) => (
          <ListItem {...item} key={idx} index={idx} />
        ))}
      </ul>
      <motion.p
        className="text-center max-w-3xl justify-self-center mt-12 text-lg px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", delay: 0.4 }}
      >
        We pride ourselves in helping fellow nonprofits like yours{" "}
        <span className="font-bold">save money</span> with free donation
        processing, <span className="font-bold">save time</span> by handling all
        admin & reporting work, and{" "}
        <span className="font-bold">save for your future</span> with simple but
        powerful high-yield savings and investment options
      </motion.p>
      <motion.div
        className="flex max-md:flex-col items-center justify-self-center gap-4 mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", delay: 0.5 }}
      >
        <Link
          to={href("/register/welcome")}
          className="btn-blue inline-flex items-center px-10 py-3 text-lg active:translate-x-1 font-bold shadow-2xl rounded-full"
        >
          Join us today!
        </Link>
        <Link
          to={BOOK_A_DEMO}
          className="inline-flex items-center px-10 py-3 text-lg bg-white shadow-2xl shadow-black/5 active:translate-x-1 text-blue-d1  font-bold rounded-full relative border border-blue-l2"
        >
          Book a demo
        </Link>
      </motion.div>
    </section>
  );
}

function ListItem(props: TListItem & { index: number }) {
  return (
    <motion.li
      className="grid lg:grid-rows-subgrid row-span-4 px-9 justify-items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", delay: props.index * 0.1 }}
    >
      <Image
        src={props.image.src}
        height={props.image.height}
        width={props.image.width}
        alt={props.image.alt}
        className="mb-4"
      />
      <h4 className="text-center  font-medium text-2xl px-8">{props.title1}</h4>
      <h5 className="py-4 text-center font-medium  text-lg @6xl:text-xl border-b-[3px] border-blue-d1 mb-7 px-8">
        {props.title2}
      </h5>
      <p className="text-center text-lg @6xl:text-xl">{props.description}</p>
    </motion.li>
  );
}
