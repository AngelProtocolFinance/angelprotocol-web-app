import { CircleQuestionMark } from "lucide-react";
interface Item {
  title: string;
  description: string;
}

export const items: Item[] = [
  {
    title: "How is it really free?",
    description:
      "We're a nonprofit. Our mission is helping other nonprofits succeed. No platform fees, ever. Donors optionally cover small credit card fees (95% do).",
  },
  {
    title: "Is our money safe?",
    description:
      "Absolutely. FDIC-insured accounts. Held with Fidelity Investments. PCI-Level 1 compliant. Same security as major banks.",
  },
  {
    title: "What if we're too small?",
    description:
      "Perfect. We built this for organizations like yours. From $10,000 to $10 million raised annually - all benefit equally.",
  },
  {
    title: "Can we keep our current bank?",
    description:
      "Yes. We grant funds to your existing accounts. No need to switch banks or change anything else.",
  },
  {
    title: "How fast can we start?",
    description:
      "Tonight. 5-minute signup. Immediate approval for most nonprofits. Start accepting donations in hours, not weeks.",
  },
];

export function Section6({ classes = "" }: { classes?: string }) {
  return (
    <div className={`${classes} py-26 grid`}>
      <h2 className="text-center text-4.5xl @6xl:text-5xl @6xl:leading-tight capitalize text-gray-d4 text-balance mb-4 ">
        "What's the Catch?"{" "}
        <span className="text-blue">(There&nbsp;Isn't One)</span>
      </h2>
      <div className="grid gap-y-16 justify-self-center mt-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex @max-3xl:flex-col gap-y-4 items-center gap-x-8 last:mb-0"
          >
            <div className="flex items-center justify-center p-4 rounded-full bg-blue-l5">
              <CircleQuestionMark className="text-blue" size={30} />
            </div>
            <div className="ml-4">
              <h4 className="text-2xl @max-3xl:text-center font-semibold">
                <span className="hidden @xl:inline">Q: </span>
                {item.title}
              </h4>
              <p className="mt-2 text-lg @max-3xl:text-center">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
