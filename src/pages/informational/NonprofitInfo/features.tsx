import { motion } from "framer-motion";
import {
  BarChart2,
  CreditCard,
  Database,
  FileText,
  Gift,
  Globe,
  MousePointer,
  Paintbrush,
  QrCode,
  RefreshCcw,
  Shapes,
  Target,
  UserCircle,
} from "lucide-react";
import type { ReactNode } from "react";

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
    body: "Flexible contributions – Accept cash, credit, crypto, stock, and donor-advised funds (DAFs).",
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
    title: "Scan to Donate",
    icon: <QrCode className="text-blue-d1" />,
    body: "Quick giving – Enable easy donations via QR codes for mobile and event fundraising.",
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
    id: 12,
    title: "Dedicated Fundraising Profile",
    icon: <UserCircle className="text-blue-d1" />,
    body: "Boost visibility – Create a dedicated profile to showcase your campaigns and engage donors.",
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
    <div className={`${classes} grid @xl:grid-cols-2 @4xl:grid-cols-3 gap-4`}>
      <h4 className="text-xl font-heading text-blue-d1 uppercase -mb-4 col-span-full text-center @4xl:text-left">
        Features
      </h4>
      <div className="row-span-2 col-span-full @4xl:col-span-1 pb-8">
        <h3 className="text-3xl @4xl:text-2xl text-navy-d3 mb-4 text-center @4xl:text-left">
          Smarter Tools for Seamless Fundraising
        </h3>
        <p className="text-lg text-center @4xl:text-left">
          Raise funds, grow donations, and secure financial stability—all with
          no platform fees.
        </p>
      </div>
      {features.map((f) => (
        <Feature key={f.id} {...f} />
      ))}
    </div>
  );
}

function Feature(props: IFeature) {
  return (
    <motion.div className="p-4 border border-blue-l4 rounded-lg grid grid-rows-subgrid row-span-2">
      <div className="flex items-center gap-x-2">
        {props.icon}
        <p className="font-bold text-sm font-heading">{props.title}</p>
      </div>
      <p className="text-navy">{props.body}</p>
    </motion.div>
  );
}
