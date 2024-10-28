import { useGSAP } from "@gsap/react";
import { benefits } from "content/benefits";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import { Header } from "./header";
import { InfoBubble } from "./info-bubble";
import { Ball, Path, PathGradient } from "./path";
import { timeline } from "./setup";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface AnimatedSVGProps {
  classes?: string;
}

export const AnimatedSVG: React.FC<AnimatedSVGProps> = ({ classes = "" }) => {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width:769px)", () => {
      gsap.defaults({ ease: "none" });
      timeline("#svg");
    });
  });

  return (
    <div className={`${classes} bg-peach/20`}>
      <svg
        width={2715}
        height={609}
        fill="none"
        viewBox="-105 66.5 1995 744.45"
        className="w-full h-screen"
        id="svg"
      >
        <Path />
        <PathGradient />
        <Ball />
        <Header />

        <InfoBubble
          id="bubble1"
          x="200"
          y="180"
          content={{
            title: "Your Gifts Keep Growing",
            text: "Choose to allocate a portion of your donations into our high-yield savings account or managed investment funds, allowing your contributions to grow and provide long-term support for your mission. Transfer balances or request grants out to your bank account at any time.",
          }}
          imageUrl={benefits.sf[0].img}
        />

        <InfoBubble
          id="bubble2"
          x="990"
          y="340"
          content={{
            title: "Simple, Sustainable Growth",
            text: "We manage both your high-yield savings and Sustainability Fund investments, giving you the peace of mind that your funds are growing steadily - without any of the administrative work of financial reporting.",
          }}
          imageUrl={benefits.sf[1].img}
        />

        <InfoBubble
          id="bubble3"
          x="1700"
          y="170"
          height={560}
          content={{
            title: "Consistent, Reliable Funding",
            text: "Receive grants monthly, benefitting from a consistent revenue stream that doesn't rely on ongoing donations. You get the best of both worlds: immediate returns from savings and long-term growth from investments.",
          }}
          imageUrl={benefits.sf[2].img}
        />

        <InfoBubble
          id="bubble4"
          x="2600"
          y="300"
          content={{
            title: "Result:",
            text: "Better Giving offers you a complete financial solution: free of donation processing, high yield savings, and expertly managed investments - all designed to maximize your financial stability and empower your nonprofit to make an even greater impact.",
          }}
          imageUrl={benefits.sf[3].img}
        />
      </svg>
    </div>
  );
};
