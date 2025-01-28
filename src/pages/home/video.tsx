import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import s from "../../assets/landing/Inifnite Half-right.webp";
import s2 from "../../assets/landing/half1.webp";
import heart from "../../assets/landing/heartOfText.webp";
import heartText from "../../assets/landing/heartText.svg";
import videobanner from "../../assets/landing/video_bannerUpdate.webp";
import styles from "./video.module.css";

const triggerId = "__video";
const textCircleId = "__text_circle";

const Video = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${triggerId}`,
        start: "top top",
        scrub: 1,
      },
      ease: "none",
      duration: 5,
    });

    tl.to(`#${textCircleId}`, {
      scrollTrigger: {
        trigger: `#${triggerId}`,
        start: "top top",
        scrub: 1,
      },
      ease: "none",
      rotation: 360,
      duration: 2,
    });

    return () => {
      for (const trigger of ScrollTrigger.getAll()) {
        trigger.kill();
      }
    };
  }, []);

  return (
    <section
      id={triggerId}
      className="grid relative px-6 pt-40 lg:pt-80 bg-linear-to-b from-peach/20 to-transparent overflow-x-clip"
    >
      <div className="flex justify-self-center relative">
        <img
          src={s2}
          alt="infinity left half"
          className="relative h-28 sm:h-52 left-[1.9rem] sm:left-[3.5rem]"
        />
        <img
          src={s}
          alt="infinity right half"
          className="relative h-28 sm:h-52 right-[1.9rem] sm:right-[3.5rem]"
        />
      </div>
      <h2
        className={`${styles.heading} justify-self-center text-gray-d4 text-[32px] md:text-[42px] text-center mb-5 -mt-12 sm:-mt-16`}
      >
        The Better.Giving Alliance
      </h2>
      <p className="z-10 text-[20px] md:text-[28px] text-gray/80 font-medium text-center max-w-2xl mx-auto text-pretty mb-14">
        Join a global alliance of partners united around a giving pledge to
        create lasting positive change{" "}
      </p>

      <div className="rounded-xl md:rounded-[3rem] max-w-[69.5rem] p-4 pb-12 border border-gray-l4 justify-self-center">
        <div className="relative">
          <img height={600} src={videobanner} alt="donation tally" />
          <TextSurroundedHeart classes="max-xl:hidden absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2" />
        </div>
        <p className="mt-20 md:text-2xl font-medium text-gray/80 text-center">
          We connect you with the causes you care about most, with pioneering
          ways to contribute, grow, and track your generosity, all while
          celebrating our collective impact.
        </p>
        {/*<Button text="Join the Movement" />*/}
      </div>
    </section>
  );
};

function TextSurroundedHeart({ classes = "" }) {
  return (
    <>
      <img
        id={textCircleId}
        src={heartText}
        className={`size-40 ${classes}`}
        alt="words in circle"
      />
      <img src={heart} alt="blue heart" className={`w-14 ${classes}`} />
    </>
  );
}

export default Video;
