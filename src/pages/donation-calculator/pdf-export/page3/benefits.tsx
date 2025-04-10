import { Check } from "lucide-react";

interface Props {
  classes?: string;
}
export function Benefits({ classes = "" }: Props) {
  const benefits = [
    {
      title: "80% Donor Fee Coverage",
      description:
        "Better Giving enables all donors to cover processing fees, and our data shows 80% opt to do so.",
    },
    {
      title: "All Donation Types",
      description:
        "Accept all donation types including crypto, stocks, and DAF, increasing your donation volume.",
    },
    {
      title: "Lower Processing Fees",
      description:
        "Better Giving doesn't charge any processing fees, but the third-party services we utilize charge an average rate of 2% (reduced to less than 0.5% with donor coverage)",
    },
    {
      title: "Automated Investments",
      description:
        "Automatically allocate a portion of donations to high-yield savings and investment accounts.",
    },
  ];

  return (
    <div className={`${classes} h-fit bg-white px-24`}>
      <h3 className="text-4xl font-bold mb-8">Better Giving Benefits</h3>

      <div className="space-y-8 text-2xl">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex gap-4">
            <Check size={20} className="shrink-0 text-green mt-1.5" />
            <div>
              <h4 className="font-semibold mb-1">{benefit.title}</h4>
              <p className="text-gray">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
