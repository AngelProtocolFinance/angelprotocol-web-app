import betaWhiteLogo from "assets/images/angelprotocol-logo-white.svg";
import ExtLink from "components/ExtLink";

export default function Logo() {
  return (
    <ExtLink
      href="https://angelprotocol.io/"
      title="Go to Marketing page"
      className="w-32 sm:w-36"
    >
      <img src={betaWhiteLogo} alt="" className="w-full h-full" />
    </ExtLink>
  );
}
