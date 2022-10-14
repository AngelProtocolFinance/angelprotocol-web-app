import { PropsWithChildren } from "react";
import { FEEDBACK, LITEPAPER, PRIVACY_POLICY, SUPPORT } from "constants/urls";

const LINK_STYLE = "text-sm hover:text-gray-l4 active:gray-l3";

export default function Links() {
  return (
    <div className="flex flex-col items-center py-6 gap-3 w-full">
      <a
        className={`font-normal ${LINK_STYLE}`}
        href={LITEPAPER}
        rel="noreferrer"
        target="_blank"
        title="Litepaper"
      >
        Download Litepaper
      </a>
      <span className="flex justify-between w-full">
        <BoldLink href={SUPPORT}>Support</BoldLink>
        <BoldLink href={FEEDBACK}>Feedback</BoldLink>
        <BoldLink href={PRIVACY_POLICY}>Privacy Policy</BoldLink>
      </span>
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
