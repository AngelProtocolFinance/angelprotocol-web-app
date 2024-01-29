import { APP_NAME } from "constants/env";
import { memo } from "react";
import { LinkGroup, SocialMediaLink } from "../types";
import Links from "./Links";
import Newsletter from "./Newsletter";
import Socials from "./Socials";

type Props = { linkGroups: LinkGroup[]; socials: SocialMediaLink[] };

function Footer({ linkGroups, socials }: Props) {
  function ref(node: HTMLElement | null) {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        const intercom = document.querySelector(".intercom-launcher");
        intercom?.classList.toggle("hidden", e.isIntersecting);
      },
      { threshold: [0.5] }
    );
    observer.observe(node);
  }

  return (
    <footer
      ref={ref}
      className="flex flex-col items-center text-white bg-blue dark:bg-blue-d3"
    >
      <section className="padded-container flex flex-col gap-8 items-center justify-center w-full pt-8 pb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0 lg:pb-16">
        <Links groups={linkGroups} />
        <Newsletter />
      </section>

      <Separator />

      <section className="padded-container flex flex-col items-center gap-2 w-full pt-6 pb-12">
        <Socials links={socials} />
        <p className="font-body font-normal text-white text-center text-2xs uppercase">
          {`Copyright ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.`}
        </p>
      </section>
    </footer>
  );
}

export default memo(Footer);

const Separator = () => <div className="w-[97vw] h-px bg-gray-l3" />;
