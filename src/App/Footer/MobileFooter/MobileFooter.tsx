import WalletSuite from "App/Header/WalletSuite";
import { PropsWithChildren } from "react";
import { FEEDBACK, LITEPAPER, PRIVACY_POLICY, SUPPORT } from "constants/urls";
import Logo from "./Logo";
import Socials from "./Socials";

const LINK_STYLE =
  "font-['Work_Sans'] text-sm hover:text-gray-l4 active:gray-l3";

export default function MobileFooter() {
  return (
    <div className="flex sm:hidden flex-col items-center px-6 bg-blue dark:bg-blue-d4 text-white">
      <section className="border-b border-gray-l2 dark:border-gray-l3 w-full">
        <div className="flex flex-col items-center gap-6 pt-6 pb-10">
          <Logo />
          <Socials />
          <WalletSuite menuPlacement="top" />
        </div>
      </section>

      <section className="flex flex-col items-center py-6 gap-3 w-full">
        <a
          className={`font-normal ${LINK_STYLE}`}
          href={LITEPAPER}
          rel="noreferrer"
          target="_blank"
          title="Litepaper"
        >
          Download Litepaper
        </a>
        <span className="flex justify-around w-full">
          <BoldLink href={SUPPORT}>Support</BoldLink>
          <BoldLink href={FEEDBACK}>Feedback</BoldLink>
          <BoldLink href={PRIVACY_POLICY}>Privacy Policy</BoldLink>
        </span>
        <span className="font-['work_sans'] font-normal text-sm">
          &#169; {new Date().getFullYear()} Angel Protocol
        </span>
      </section>
    </div>
  );
}

function BoldLink({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <a
      className={`font-bold ${LINK_STYLE}`}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
