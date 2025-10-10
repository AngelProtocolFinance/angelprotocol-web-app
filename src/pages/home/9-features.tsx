import { APP_NAME } from "constants/env";
import {
  BarChart2,
  CreditCard,
  Database,
  FileText,
  Gift,
  Globe,
  MousePointer,
  Paintbrush,
  RefreshCcw,
  Shapes,
  Target,
  UsersIcon,
} from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Link, href } from "react-router";

const MLink = motion.create(Link);

interface IFeature {
  id: number;
  title: string;
  icon: ReactNode;
  body: string;
}
const features: IFeature[] = [
  {
    id: 1,
    title: "Recurring Donations",
    icon: <RefreshCcw className="text-blue-d1" />,
    body: "Stabilize revenue – Ensure predictable, ongoing support with automated recurring donations.",
  },
  {
    id: 2,
    title: "Multiple Donation Types",
    icon: <Shapes className="text-blue-d1" />,
    body: "Flexible Contributions - Accept cash, credit, bank transfers, crypto, stock and donor-advised funds (DAFs).",
  },
  {
    id: 3,
    title: "Global Donor Access",
    icon: <Globe className="text-blue-d1" />,
    body: "Expand reach – Accept donations worldwide with localized multi-currency support.",
  },
  {
    id: 4,
    title: "Customizable & Embeddable Forms",
    icon: <Paintbrush className="text-blue-d1" />,
    body: "Seamless branding – Embed fully branded, customizable forms directly on your website.",
  },
  {
    id: 5,
    title: "Goal Tracking Progress Bars",
    icon: <BarChart2 className="text-blue-d1" />,
    body: "Boost engagement – Show real-time progress with progress bars to motivate donors.",
  },
  {
    id: 6,
    title: "Peer-to-Peer Fundraising",
    icon: <UsersIcon className="text-blue-d1" />,
    body: "Empower every supporter to become a fundraiser and crowdfund with ease.",
  },
  {
    id: 7,
    title: "Dedication Gifts",
    icon: <Gift className="text-blue-d1" />,
    body: "Personalize giving – Let donors dedicate their gifts to someone special, adding a personal touch.",
  },
  {
    id: 8,
    title: "Donors Covering Processing Fees",
    icon: <CreditCard className="text-blue-d1" />,
    body: "Full donations – 95% of donors choose to cover transaction fees so nonprofits receive 100% of the gift.",
  },
  {
    id: 9,
    title: "Program-Specific Fundraising",
    icon: <Target className="text-blue-d1" />,
    body: "Targeted giving – Let donors fund specific programs or initiatives aligned with their interests.",
  },
  {
    id: 10,
    title: "Donor Information Access",
    icon: <Database className="text-blue-d1" />,
    body: "Actionable insights – Access complete donor data for personalized outreach and retention.",
  },
  {
    id: 11,
    title: "Conversion-Optimized UI/UX",
    icon: <MousePointer className="text-blue-d1" />,
    body: "Maximize donations – An intuitive, user-friendly interface increases completed donations.",
  },
  {
    id: 13,
    title: "Automated Tax Reporting & Receipts",
    icon: <FileText className="text-blue-d1" />,
    body: "Simplify compliance – We handle tax receipts and reporting, reducing your administrative burden.",
  },
];

export function Features({ classes = "" }) {
  return (
    <section
      className={`${classes} grid lg:grid-cols-2 xl:grid-cols-3 gap-4 py-8`}
      aria-labelledby="features-heading"
    >
      <motion.p
        className="text-lg  text-blue-d1 uppercase -mb-4 col-span-full text-center xl:text-left"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring" }}
      >
        Features
      </motion.p>
      <motion.header
        className="row-span-2 col-span-full pb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", delay: 0.1 }}
      >
        <h2
          id="features-heading"
          className="text-2xl xl:text-3xl text-gray-d3 mb-4 text-center xl:text-left"
        >
          Smarter Tools for seamless fundraising
        </h2>
        <p className="text-lg text-center xl:text-left">
          Raise funds, grow donations, and secure financial stability—all with
          no platform fees.
        </p>
      </motion.header>
      <ul className="contents">
        {features.map((f, idx) => (
          <Feature key={f.id} {...f} index={idx} />
        ))}
      </ul>

      <MLink
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring" }}
        to={href("/register/welcome")}
        className="text-center capitalize col-span-full justify-self-center btn-blue ml-1 group active:translate-x-1 font-bold shadow-2xl inline-flex items-center px-10 py-3 gap-1 rounded-full text-lg mt-4"
      >
        Explore all {APP_NAME} features
      </MLink>
    </section>
  );
}

function Feature(props: IFeature & { index: number }) {
  return (
    <motion.li
      className="p-4 border border-blue-l4 rounded-lg grid grid-rows-subgrid row-span-2 bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", delay: (props.index % 6) * 0.05 }}
    >
      <div className="flex items-center gap-x-2">
        {props.icon}
        <h3 className="font-bold text-sm ">{props.title}</h3>
      </div>
      <p className="text-gray-d1">{props.body}</p>
    </motion.li>
  );
}
