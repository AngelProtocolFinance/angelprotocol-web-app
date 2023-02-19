import { ExtLink } from "@ap/components";
import angelProtocolLogo from "./assets/angelprotocol-beta-horiz-wht.svg";

export default function APLogo({ className = "" }) {
  return (
    <ExtLink
      href="https://angelprotocol.io/"
      title="Go to Marketing page"
      className={className}
    >
      <img src={angelProtocolLogo} alt="" className="w-full h-full" />
    </ExtLink>
  );
}
