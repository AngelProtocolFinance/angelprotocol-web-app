import { benefits } from "content/benefits";
import { useEffect, useRef } from "react";
import { Header } from "./header";
import { InfoBubble } from "./info-bubble";
import { Ball, Path, PathGradient } from "./path";
import { createScrollAnimation } from "./setup";

interface AnimatedSVGProps {
  classes?: string;
}

export function AnimatedSVG({ classes = "" }: AnimatedSVGProps) {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Cleanup previous animation if exists
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    // Create new scroll animation
    const cleanup = createScrollAnimation({
      element: "#svg",
      path_element: ".line",
    });

    cleanupRef.current = cleanup || null;

    // Cleanup on unmount
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  return (
    <div className={`${classes} relative min-h-[200vh]`}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <svg
          width={2715}
          height={609}
          fill="none"
          viewBox="0 60 1795.5 670"
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
            y="162"
            content={{
              title: "Your Gifts Keep Growing",
              text: "Choose to allocate a portion of your donations into our high-yield savings account or managed investment funds, allowing your contributions to grow and provide long-term support for your mission. Transfer balances or request grants out to your bank account at any time.",
            }}
            imageUrl={benefits.sf[0].img}
          />

          <InfoBubble
            id="bubble2"
            x="990"
            y="306"
            content={{
              title: "Simple, Sustainable Growth",
              text: "We manage both your high-yield savings and Sustainability Fund investments, giving you the peace of mind that your funds are growing steadily - without any of the administrative work of financial reporting.",
            }}
            imageUrl={benefits.sf[1].img}
          />

          <InfoBubble
            id="bubble3"
            x="1700"
            y="153"
            content={{
              title: "Consistent, Reliable Funding",
              text: "Receive grants monthly, benefitting from a consistent revenue stream that doesn't rely on ongoing donations. You get the best of both worlds: immediate returns from savings and long-term growth from investments.",
            }}
            imageUrl={benefits.sf[2].img}
          />

          <InfoBubble
            id="bubble4"
            x="2600"
            y="210"
            content={{
              title: "Result:",
              text: "Better Giving offers you a complete financial solution: free donation processing, high yield savings, and expertly managed investments - all designed to maximize your financial stability and empower your nonprofit to make an even greater impact.",
            }}
            imageUrl={benefits.sf[3].img}
          />
        </svg>
      </div>
    </div>
  );
}
