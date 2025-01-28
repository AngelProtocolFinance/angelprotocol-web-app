import { benefits } from "content/benefits";
import path from "./images/static-path.webp";
import StepsCard from "./steps-card";
import type { Card } from "./types";

const MobileAnimation = ({ classes = "" }) => {
  const cards: Card[] = [
    {
      img: benefits.sf[0].img,
      title: "The Gift That Keeps On Giving",
      description:
        "Donors can choose a portion of their donation to go into the Sustainability Fund, allowing it to grow and provide ongoing support to the nonprofit of their choice - forever.",
    },
    {
      img: benefits.sf[1].img,
      title: "Simple, Sustainable Growth",
      description:
        "The Sustainability Fund is owned and managed by Better Giving and invested into a balanced portfolio to protect and grow over time - no admin work or liability for nonprofits.",
    },
    {
      img: benefits.sf[2].img,
      title: "Reliable Funding Stream",
      description:
        "Sustainability Fund growth is paid out quarterly, providing nonprofits with a new source of recurring revenue - consistent funding that doesn’t rely on donation cycles.",
    },
    {
      img: benefits.sf[3].img,
      title: "Result:",
      description:
        "Better Giving provides nonprofits with a simple path to financial stability while giving donors a way to amplify their impact, ensuring their gift continues to provide support - not just today, but every day.",
    },
  ];

  return (
    <div
      className={`${classes} relative pt-24 bg-peach/20 grid px-4 bg-no-repeat`}
      style={{ backgroundImage: `url('${path}')` }}
    >
      <h2 className="text-sm md:text-lg text-blue-d1 text-center mb-4">
        SIMPLE PATH TO FINANCIAL STABILITY
      </h2>
      <h3 className="text-center text-3xl md:text-4.5xl/snug text-balance mb-6 px-4">
        Make a Lasting Impact: <br /> Give Today, Give Forever
      </h3>

      <div className="grid gap-32 xl:container xl:mx-auto px-5 mt-4">
        {cards.map((card, idx) => {
          return <StepsCard key={idx} {...card} />;
        })}
      </div>
    </div>
  );
};

export default MobileAnimation;
