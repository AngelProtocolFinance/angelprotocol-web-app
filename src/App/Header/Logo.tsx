import angelProtocolLogo from "assets/images/angelprotocol-beta-horiz-wht.svg";

export default function Logo({ className }: { className?: string }) {
  return (
    <a
      href="https://angelprotocol.io/"
      title="Go to Marketing page"
      className={className}
    >
      <img src={angelProtocolLogo} alt="" className="w-full h-full" />
    </a>
  );
}
