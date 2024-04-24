import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import s from "../../assets/landing/Inifnite Half-right.png";
import s2 from "../../assets/landing/half1.png";
import heart from "../../assets/landing/heartOfText.png";
import heartText from "../../assets/landing/heartText.svg";
import videobanner from "../../assets/landing/video_bannerUpdate.png";

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
    <section id={triggerId} className="grid relative">
      <div className="flex justify-self-center relative">
        <img
          src={s2}
          alt=""
          className="relative h-28 sm:h-52 left-[1.9rem] sm:left-[3.5rem]"
        />
        <img
          src={s}
          alt=""
          className="relative h-28 sm:h-52 right-[1.9rem] sm:right-[3.5rem]"
        />
      </div>
      <h2 className="text-navy-d4 text-[32px] md:text-[42px] text-center">
        The Better.Giving Alliance
      </h2>
      <p className="text-[20px] md:text-[28px] text-navy-l1/80 font-medium text-center max-w-2xl mx-auto text-pretty">
        Join a global alliance of partners united around a giving pledge to
        create lasting positive change{" "}
      </p>

      <div className="rounded-[3rem] max-w-[69.5rem] p-4 border border-gray-l4 justify-self-center">
        <div className="relative">
          <img src={videobanner} alt="video" className="" />
          <HeartSurroundedText classes="max-xl:hidden absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2" />
        </div>
        <p className="md:text-2xl font-medium text-navy-l1/80 text-center mt-20">
          We connect you with the causes you care about most, with pioneering
          ways to contribute, grow, and track your generosity, all while
          celebrating our collective impact.
        </p>
        {/*<Button text="Join the Movement" />*/}
      </div>
    </section>
  );
};
//left-0 bottom-0 -translate-x-1/2 translate-y-1/2

function HeartSurroundedText({ classes = "" }) {
  return (
    <>
      <img
        id={textCircleId}
        src={heartText}
        className={` size-40 ${classes}`}
        alt="words in circle"
      />
      <img
        src={heart}
        alt="blue heart"
        className={`w-14 absolute ${classes}`}
      />
    </>
  );
}

export default Video;
