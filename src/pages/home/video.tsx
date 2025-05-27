import { useEffect, useRef } from "react";
import s from "../../assets/landing/Inifnite Half-right.webp";
import s2 from "../../assets/landing/half1.webp";
import heart from "../../assets/landing/heartOfText.webp";
import heartText from "../../assets/landing/heartText.svg";
import videobanner from "../../assets/landing/video_bannerUpdate.webp";
import styles from "./video.module.css";

const trigger_id = "__video";
const text_circle_id = "__text_circle";

function handle_scroll_animation() {
  const circle = document.getElementById(text_circle_id);
  const section = document.getElementById(trigger_id);
  if (!circle || !section) return;
  const rect = section.getBoundingClientRect();
  const window_height = window.innerHeight;
  // Only animate if section is in viewport
  if (rect.bottom < 0 || rect.top > window_height) return;
  // Calculate scroll progress (0 at section top, 1 at section bottom)
  const section_height = rect.height;
  const scroll_y = window.scrollY || window.pageYOffset;
  const section_top = rect.top + scroll_y;
  const progress = Math.min(
    Math.max(
      (scroll_y + window_height - section_top) /
        (section_height + window_height),
      0
    ),
    1
  );
  circle.style.transform = `rotate(${progress * 360}deg)`;
}

export function Video() {
  const ticking = useRef(false);

  useEffect(() => {
    function on_scroll() {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          handle_scroll_animation();
          ticking.current = false;
        });
        ticking.current = true;
      }
    }
    window.addEventListener("scroll", on_scroll, { passive: true });
    // Initial call in case already scrolled
    handle_scroll_animation();
    return () => {
      window.removeEventListener("scroll", on_scroll);
    };
  }, []);

  return (
    <section
      id={trigger_id}
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

      <div className="rounded-xl md:rounded-[3rem] max-w-[69.5rem] p-4 pb-12 border border-gray-l3 justify-self-center">
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
}

export function TextSurroundedHeart({ classes = "" }) {
  return (
    <>
      <img
        id={text_circle_id}
        src={heartText}
        className={`size-40 ${classes}`}
        alt="words in circle"
      />
      <img src={heart} alt="blue heart" className={`w-14 ${classes}`} />
    </>
  );
}
