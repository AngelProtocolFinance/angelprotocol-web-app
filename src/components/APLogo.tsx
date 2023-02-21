import angelProtocolLogo from "assets/images/angelgiving-H-logo-beta-wht.svg";
import { BASE_DOMAIN } from "constants/common";

export default function APLogo({ className = "" }) {
  return (
    <a href={BASE_DOMAIN} title="Go to Marketing page" className={className}>
      <img src={angelProtocolLogo} alt="" className="w-full h-full" />
    </a>
  );
}
