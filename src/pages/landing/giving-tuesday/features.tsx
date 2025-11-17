import { CheckIcon, ClockIcon, TrendingUpIcon, WalletIcon } from "lucide-react";
import type { ReactElement } from "react";

interface ICard {
  title: string;
  description: string;
  icon: ReactElement;
}
export const cards: ICard[] = [
  {
    icon: (
      <WalletIcon className="stroke-white bg-blue-l1 p-2 rounded-full size-10" />
    ),
    title: "Every giving method",
    description:
      "Cards,   crypto, bank transfers, and DAFs in one place. Accept donations however donors prefer.",
  },
  {
    icon: (
      <TrendingUpIcon className="stroke-white bg-blue-l1 p-2 rounded-full size-10" />
    ),
    title: "Earning wallets",
    description:
      "Savings that grow all year long. Watch your donations compound over time.",
  },
  {
    icon: (
      <ClockIcon className="stroke-white bg-blue-l1 p-2 rounded-full size-10" />
    ),
    title: "Year-round support",
    description:
      "Not just for one day. Our team and features are here every day of the year.",
  },
];

export function Features({ classes = "" }) {
  return (
    <div className={`${classes} grid bg-blue-l4 rounded-xl py-10`}>
      <h2 className="text-center section-heading">
        Our features aren't seasonal. They're standard.
      </h2>
      <p className="section-body mt-4 text-center">
        Everything you need to grow your mission, available every single day.
      </p>
      <div className="grid gap-4 mt-10 xl:grid-cols-3 xl:grid-rows-[auto_auto_1fr]">
        {cards.map(({ title, description, icon }) => (
          <div
            key={title}
            className="bg-white grid grid-rows-subgrid row-span-3 items-center p-6 rounded-lg transition-shadow duration-300"
          >
            <div className="p-1">{icon}</div>
            <div className="text-xl font-semibold flex items-center gap-x-1">
              <CheckIcon size={20} className="h-[1h] stroke-green stroke-2" />
              {title}
            </div>
            <p className="text-gray">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
