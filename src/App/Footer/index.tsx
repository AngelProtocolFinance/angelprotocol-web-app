import { LITEPAPER } from "constants/urls";
import Links from "./Links";
import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-6">
      <nav className="w-full grid lg:grid-cols-2 padded-container content-start">
        <Links classes="col-span-full justify-center lg:col-start-2 lg:col-span-1 lg:self-start lg:justify-end" />
        <div className="grid justify-items-center lg:justify-items-start row-start-2 lg:row-start-1">
          <Socials classes="mt-4 lg:mt-0" />
          <a
            href={LITEPAPER}
            className=" font-semibold text-xs font-heading uppercase text-white-grey my-4 hover:text-sky-300"
            target="_blank"
            rel="noreferrer"
          >
            Download Litepaper
          </a>
          <p className="text-white-grey/70 text-center text-xs uppercase ">
            Copyright {new Date().getFullYear()} Angel Protocol. All rights
            reserved
          </p>
        </div>
      </nav>
    </footer>
  );
}
