import { ExtLink } from "components/ext-link";
import { INTERCOM_HELP } from "constants/env";
import { ArrowRight, CircleQuestionMark } from "lucide-react";
interface Item {
  title: string;
  description: string;
}

export const items: Item[] = [
  {
    title: "How is it really free?",
    description:
      "A: We're a nonprofit. Our mission is helping other nonprofits succeed. No platform fees, ever. Donors optionally cover small credit card fees (95% do).",
  },
  {
    title: "Is our money safe?",
    description:
      "A: Absolutely. FDIC-insured accounts. Held with Fidelity Investments. PCI-Level 1 compliant. Same security as major banks.",
  },
  {
    title: "What if we're too small?",
    description:
      "A: Perfect. We built this for organizations like yours. From $10,000 to $10 million raised annually - all benefit equally.",
  },
  {
    title: "Can we keep our current bank?",
    description:
      "A: Yes. We grant funds to your existing accounts. No need to switch banks or change anything else.",
  },
  {
    title: "How fast can we start?",
    description:
      "A: Right now! 5-minute signup. Speedy approval for most nonprofits. Start accepting donations in hours, not weeks.",
  },
];

export function Section6({ classes = "" }: { classes?: string }) {
  return (
    <div className={`${classes} py-12 grid`}>
      <h2 className="text-center text-4.5xl @6xl:text-5xl @6xl:leading-tight capitalize text-gray-d4 text-balance mb-4 ">
        "What's the Catch?"{" "}
        <span className="text-blue">(There&nbsp;Isn't One)</span>
      </h2>
      <div className="grid gap-y-8 justify-self-center mt-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex @max-3xl:flex-col gap-y-4 items-center gap-x-8 last:mb-0 bg-white p-8 rounded-xl shadow-xl shadow-black/2"
          >
            <div className="flex items-center justify-center p-4 rounded-full bg-blue-l5">
              <CircleQuestionMark className="text-blue" size={30} />
            </div>
            <div className="ml-4">
              <h4 className="text-2xl @max-3xl:text-center  font-medium">
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
      <div className="grid pt-8 mt-8">
        <ExtLink
          href={INTERCOM_HELP}
          className="justify-self-center flex items-center gap-x-2 text-blue hover:text-blue-d1 md:text-lg  font-medium"
        >
          <span>Complete FAQs</span>
          <ArrowRight size={15} />
        </ExtLink>
        <button
          type="button"
          onClick={() => {
            if ((window as any).Intercom) {
              return (window as any).Intercom("show");
            }
            window.open(INTERCOM_HELP, "_blank");
          }}
          className="mt-4 justify-self-center flex items-center gap-x-2 text-blue hover:text-blue-d1 md:text-lg  font-medium"
        >
          Need additional support? Live Chat.
        </button>
      </div>
    </div>
  );
}
