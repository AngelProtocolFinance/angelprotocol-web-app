import angelProtocolLogo from "assets/images/angelprotocol-beta-horiz-wht.svg";
import ExtLink from "components/ExtLink";

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
