import web3AuthLogo from "assets/images/web3auth-logo.svg";

export default function PartnerContent() {
  return (
    <div className="flex flex-col gap-2 items-center text-xs">
      <span className="flex gap-2 items-center">
        Secured by
        <img src={web3AuthLogo} alt="Web3Auth" />
      </span>
      <p>
        Angel Protocol is partnered with Web3Auth to provide you with the hights
        level of security for your Angel Protocol account.
      </p>
    </div>
  );
}
