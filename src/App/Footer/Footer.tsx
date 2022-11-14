import { memo } from "react";
import Links from "./Links";
import Newsletter from "./Newsletter";
import Socials from "./Socials";

function Footer() {
  return (
    <footer className="padded-container flex flex-col items-center px-2.5 text-white bg-blue dark:bg-blue-d3">
      <section className="flex flex-col items-center justify-center w-full pt-8 pb-16 border-b border-gray-l2 dark:border-gray-l3 md:flex-row">
        <div className="flex flex-col gap-10 items-center justify-between w-full lg:flex-row lg:items-start">
          <Links />
          <Newsletter />
        </div>
      </section>

      <section className="flex flex-col items-center gap-2 w-full py-4">
        <Socials />
        <p className="font-body font-normal text-white text-center text-2xs uppercase">
          Copyright {new Date().getFullYear()} Angel Protocol. All rights
          reserved
        </p>
      </section>
    </footer>
  );
}

export default memo(Footer);
