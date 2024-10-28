// animations/animationSetup.ts
import { gsap } from "gsap";

export const timeline = (element: string): gsap.core.Timeline => {
  const segment1 = 0.25;
  const segment2 = 0.5;
  const segment3 = 0.75;
  const segment4 = 1;

  // Adjusted viewBox positions to maintain proper panning
  const viewBoxes = {
    start: "-105 66.5 1995 744.45", // Shows bubble 1 and 2 initially
    middle: "800 66.5 1995 744.45", // Centers bubble 2, shows part of 3
    preEnd: "1400 66.5 1995 744.45", // Centers bubble 3, shows part of 4
    end: "2000 66.5 1995 744.45", // Shows bubble 4 on the right edge
  };

  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      scrub: 0.6,
      pin: true,
      start: "top 10%",
      end: "bottom -40%",
    },
    defaults: {
      ease: "none",
    },
  });

  // Set initial states
  gsap.set("#svg", { attr: { viewBox: viewBoxes.start } });
  gsap.set(["#bubble1", "#bubble2", "#bubble3", "#bubble4"], {
    filter: "grayscale(100%)",
  });

  // Ball movement and initial bubble
  mainTimeline
    .to(
      "#ball",
      {
        motionPath: {
          path: ".line",
          align: ".line",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: segment1,
        },
        duration: 5,
      },
      0
    )
    .to(
      "#bubble1",
      {
        filter: "grayscale(0%)",
        duration: 0.5,
      },
      4.5
    )
    .to(
      "#bubble1",
      {
        filter: "grayscale(100%)",
        duration: 0.5,
      },
      0
    );

  // Sequence to bubble 2 with first pan
  mainTimeline
    .to(
      "#ball",
      {
        motionPath: {
          path: ".line",
          align: ".line",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: segment1,
          end: segment2,
        },
        duration: 5,
      },
      5
    )
    .to(
      "#svg",
      {
        attr: { viewBox: viewBoxes.middle },
        duration: 5,
      },
      5
    )
    .to(
      "#bubble2",
      {
        filter: "grayscale(0%)",
        duration: 0.5,
      },
      9.5
    )
    .to(
      "#bubble2",
      {
        filter: "grayscale(100%)",
        duration: 0.5,
      },
      5
    );

  // Sequence to bubble 3 with second pan
  mainTimeline
    .to(
      "#ball",
      {
        motionPath: {
          path: ".line",
          align: ".line",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: segment2,
          end: segment3,
        },
        duration: 5,
      },
      10
    )
    .to(
      "#svg",
      {
        attr: { viewBox: viewBoxes.preEnd },
        duration: 5,
      },
      10
    )
    .to(
      "#bubble3",
      {
        filter: "grayscale(0%)",
        duration: 0.5,
      },
      14.5
    )
    .to(
      "#bubble3",
      {
        filter: "grayscale(100%)",
        duration: 0.5,
      },
      10
    );

  // Final sequence to bubble 4
  mainTimeline
    .to(
      "#ball",
      {
        motionPath: {
          path: ".line",
          align: ".line",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: segment3,
          end: segment4,
        },
        duration: 5,
      },
      15
    )
    .to(
      "#svg",
      {
        attr: { viewBox: viewBoxes.end },
        duration: 5,
      },
      15
    )
    .to(
      "#bubble4",
      {
        filter: "grayscale(0%)",
        duration: 0.5,
      },
      19.5
    )
    .to(
      "#bubble4",
      {
        filter: "grayscale(100%)",
        duration: 0.5,
      },
      15
    );

  return mainTimeline;
};
