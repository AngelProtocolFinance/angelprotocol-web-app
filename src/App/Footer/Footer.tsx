import { memo } from "react";
import Links from "./Links";
import Newsletter from "./Newsletter";
import Socials from "./Socials";

function Footer() {
  return (
    <footer className="flex flex-col items-center text-white bg-blue dark:bg-blue-d3">
      <section className="padded-container flex flex-col gap-8 items-center justify-center w-full pt-8 pb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0 lg:pb-16">
        <Links />
        <Newsletter />
      </section>

      <Separator />

      <section className="padded-container flex flex-col items-center gap-2 w-full pt-6 pb-12">
        <Socials />
        <p className="font-body font-normal text-white text-center text-2xs uppercase">
          Copyright {new Date().getFullYear()} Angel Protocol. All rights
          reserved.
        </p>
      </section>
    </footer>
  );
}

export default memo(Footer);

const Separator = () => <div className="w-[97vw] h-px bg-gray-l3" />;
