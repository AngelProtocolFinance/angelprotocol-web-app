import angelProtocolLogo from "assets/images/angelgiving-H-logo-beta-wht.svg";
import { BASE_DOMAIN } from "constants/common";
import Image from "./Image";

export default function APLogo({ className = "" }) {
  return (
    <a href={BASE_DOMAIN} title="Go to Marketing page" className={className}>
      <Image src={angelProtocolLogo} className="w-full h-full" />
    </a>
  );
}
