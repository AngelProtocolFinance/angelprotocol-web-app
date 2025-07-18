import { Link } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import {
  ClockIcon,
  DollarSignIcon,
  HeartIcon,
  type LucideIcon,
  TriangleAlertIcon,
} from "lucide-react";

interface Props {
  classes?: string;
}

interface Card_Item {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function Section3({ classes = "" }: Props) {
  const card_items: Card_Item[] = [
    {
      icon: DollarSignIcon,
      title: "Zero Fees",
      description: "Keep every penny. No platform fees. Ever.",
    },
    {
      icon: ClockIcon,
      title: "Automated Admin",
      description: "No receipts. No tracking. No reports. All automatic.",
    },
    {
      icon: TriangleAlertIcon,
      title: "Growing Returns",
      description: "4-5% interest on reserves. Your money actually works.",
    },
    {
      icon: HeartIcon,
      title: "Nonprofit-Built",
      description: "We're a 501(c)(3). We understand your mission.",
    },
  ];

  return (
    <div className={`${classes} py-26`}>
      <h2 className="text-center text-4.5xl @6xl:text-5xl @6xl:leading-tight capitalize text-gray-d4 text-balance mb-4 ">
        Keep <span className="text-blue">Every Dollar</span>.
      </h2>
      <p className="text-xl @6xl:text-2xl mb-6 font-heading @6xl:leading-tight capitalize text-gray-d1 font-medium text-center text-balance">
        Zero fees. Zero admin. Just funding for your mission.
      </p>
      <div className="grid @6xl:grid-cols-2 gap-4">
        {card_items.map((item, index) => (
          <div
            key={index}
            className="grid grid-rows-subgrid row-span-3 p-6 rounded-xl bg-blue-l5 border-blue-l4 border"
          >
            <item.icon size={30} className="text-blue justify-self-center" />
            <h4 className="capitalize text-lg @max-6xl:text-center">
              {item.title}
            </h4>
            <p className="@max-6xl:text-center">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="text-balance bg-blue-l5 mt-16 p-8 rounded-xl rounded-tl-none rounded-bl-none">
        <p className="text-2xl text-center @6xl:text-3xl @6xl:leading-tight mt-4 font-semibold">
          Result:
        </p>
        <p className="text-xl text-blue text-center @6xl:text-2xl @6xl:leading-tight mt-4 font-semibold">
          More funding. Less stress. Real growth.
        </p>
      </div>
      <Link
        to={`${appRoutes.register}/welcome`}
        className="block mt-8 text-center justify-self-center btn-blue px-6 py-2 @6xl:px-10 @6xl:py-4 @6xl:text-lg shadow-blue/30 hover:shadow-blue/50 active:translate-x-1 font-heading capitalize font-bold shadow-2xl rounded-xl"
      >
        Start Free
      </Link>
    </div>
  );
}
