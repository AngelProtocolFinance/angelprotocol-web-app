import {
  ChartNoAxesColumnIncreasingIcon,
  DollarSignIcon,
  Shield,
  TargetIcon,
  ZapIcon,
} from "lucide-react";
import type { ReactNode } from "react";

interface Item {
  emoji: string;
  title: string;
  description: string;
  result: string;
  icon: ReactNode;
}

export const items: Item[] = [
  {
    emoji: "🎯",
    title: "One donation form. every payment type.",
    description:
      "Accept cash, credit, stock, crypto, DAF donations. One simple form. No multiple platforms. No complexity.",
    result: "Result: Never lose a donor due to payment limitations.",
    icon: <TargetIcon className="text-blue-l2" size={50} />,
  },
  {
    emoji: "⚡",
    title: "5-Minute Setup. Tonight You're Live.",
    description:
      "Register today. Accept donations tonight. No technical headaches. No waiting weeks.",
    result: "Result: Start saving on fees immediately.",
    icon: <ZapIcon className="text-blue-l2" size={50} />,
  },
  {
    emoji: "🛡️",
    title: "Bulletproof Security & Compliance",
    description:
      "FDIC-insured. PCI-compliant. Built by a 501(c)(3). Your donors' data is fortress-protected.",
    result: "Result: Sleep easy knowing everything's secure.",
    icon: <Shield className="text-blue-l2" size={50} />,
  },
  {
    emoji: "📊",
    title: "Real-Time Dashboard. Zero Spreadsheets.",
    description:
      "See every donation, track growth, download reports instantly. No more manual tracking.",
    result: "Result: Financial clarity in seconds, not hours.",
    icon: (
      <ChartNoAxesColumnIncreasingIcon className="text-blue-l2" size={50} />
    ),
  },
  {
    emoji: "💰",
    title: "Your Money, Your Control",
    description:
      "Withdraw funds anytime. Choose savings or investment options. You stay in complete control.",
    result: "Result: Flexibility without sacrificing growth.",
    icon: <DollarSignIcon className="text-blue-l2" size={50} />,
  },
];

export function Section5({ classes = "" }: { classes?: string }) {
  return (
    <div className={`${classes} py-26`}>
      <h2 className="text-center text-4.5xl @6xl:text-5xl @6xl:leading-tight capitalize text-gray-d4 text-balance mb-4 ">
        How We End Your Financial Pain
      </h2>
      <div>
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-x-8 last:mb-0">
            {item.icon}
            <div className="ml-4">
              <h4 className="text-xl font-medium relative flex items-center">
                <span className="absolute -left-7 text-2xl bottom-[0.5px]">
                  {item.emoji}
                </span>
                {item.title}
              </h4>
              <p className="mt-2 text-gray-700">{item.description}</p>
              <p className="mt-1 italic font-semibold text-blue-l1">
                {item.result}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
