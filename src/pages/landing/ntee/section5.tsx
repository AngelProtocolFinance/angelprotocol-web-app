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
    icon: <TargetIcon className="text-blue-l2" size={30} />,
  },
  {
    emoji: "⚡",
    title: "Quick Setup. Live in a Day.",
    description:
      "Start accepting donations fast - no fees, no complex tech, no waiting weeks.",
    result: "Result: Grow your impact and savings from day one.   ",
    icon: <ZapIcon className="text-blue-l2" size={30} />,
  },
  {
    emoji: "🛡️",
    title: "Bulletproof Security & Compliance",
    description:
      "FDIC-insured. PCI-compliant. Built by a 501(c)(3). Your donors' data is fortress-protected.",
    result: "Result: Sleep easy knowing everything's secure.",
    icon: <Shield className="text-blue-l2" size={30} />,
  },
  {
    emoji: "📊",
    title: "Real-Time Dashboard. Zero Spreadsheets.",
    description:
      "See every donation, track growth, download reports instantly. No more manual tracking.",
    result: "Result: Financial clarity in seconds, not hours.",
    icon: (
      <ChartNoAxesColumnIncreasingIcon className="text-blue-l2" size={30} />
    ),
  },
  {
    emoji: "💰",
    title: "Your Money, Your Control",
    description:
      "Withdraw funds anytime. Choose savings or investment options. You stay in complete control.",
    result: "Result: Flexibility without sacrificing growth.",
    icon: <DollarSignIcon className="text-blue-l2" size={30} />,
  },
];

export function Section5({ classes = "" }: { classes?: string }) {
  return (
    <div className={`${classes} py-26 grid`}>
      <h2 className="text-center text-4.5xl @6xl:text-5xl @6xl:leading-tight capitalize text-gray-d4 text-balance mb-4 ">
        How We End Your Financial Pain
      </h2>
      <div className="grid gap-y-16 justify-self-center mt-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex @max-3xl:flex-col gap-y-4 items-center gap-x-16 last:mb-0"
          >
            <div className="flex items-center justify-center p-4 rounded-full bg-blue-l5">
              {item.icon}
            </div>
            <div className="ml-4">
              <h4 className="text-2xl @max-3xl:text-center  font-medium relative">
                <span className="absolute -left-8 text-2xl hidden @3xl:block">
                  {item.emoji}
                </span>
                {item.title}
              </h4>
              <p className="mt-2 text-lg  @max-3xl:text-center">
                {item.description}
              </p>
              <p className="mt-1 italic  font-medium text-blue-l1  @max-3xl:text-center">
                {item.result}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
