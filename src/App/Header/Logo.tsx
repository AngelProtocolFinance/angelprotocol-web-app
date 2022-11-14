import betaWhiteLogo from "assets/images/angelprotocol-logo-white.svg";

export default function Logo() {
  return (
    <a
      rel="noreferrer"
      href="https://angelprotocol.io/"
      title="Go to Marketing page"
      className="w-32 sm:w-36"
    >
      <img src={betaWhiteLogo} alt="" className="w-full h-full" />
    </a>
  );
}
