import web3AuthLogo from "assets/images/web3auth-logo.webp";

export default function PartnerContent() {
  return (
    <div className="flex flex-col gap-2 items-center text-xs">
      <span className="flex gap-2 items-center">
        Secured by
        <img src={web3AuthLogo} alt="" width={120} />
      </span>
      <p>
        Angel Protocol is partnered with Web3Auth to provide you with the
        highest level of security for your Angel Protocol account.
      </p>
    </div>
  );
}
