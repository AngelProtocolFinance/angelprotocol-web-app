import { LOGIN_PROVIDER } from "@toruslabs/openlogin";
import gmailIcon from "assets/images/gmail.webp";
import web3AuthLogo from "assets/images/web3auth-logo.webp";
import { useSetWallet } from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import ButtonSocial from "./ButtonSocial";
import ContinueWithEmail from "./ContinueWithEmail";

export default function Web3Auth() {
  const { connections } = useSetWallet();
  const login = async (arg: string) => {};
  return (
    <div className="flex flex-col justify-between bg-angel-blue h-96 max-w-sm p-4 rounded-sm">
      <ButtonSocial onClick={() => login(LOGIN_PROVIDER.GOOGLE)}>
        <img src={gmailIcon} alt="Google" width={30} />
        <span className="text-gray-500">Continue with Google</span>
      </ButtonSocial>

      <div className="flex justify-between gap-4">
        <ButtonSocial onClick={() => login(LOGIN_PROVIDER.FACEBOOK)}>
          <Icon type="FacebookCircle" className="text-blue-accent" size={30} />
        </ButtonSocial>

        <ButtonSocial onClick={() => login(LOGIN_PROVIDER.LINKEDIN)}>
          <Icon type="Linkedin" className="text-blue-500" size={30} />
        </ButtonSocial>

        <ButtonSocial onClick={() => login(LOGIN_PROVIDER.DISCORD)}>
          <Icon type="Discord" className="text-purple-600" size={30} />
        </ButtonSocial>
      </div>

      <Separator />

      <ContinueWithEmail
        onClick={() => login(LOGIN_PROVIDER.EMAIL_PASSWORDLESS)}
      />

      <PartnerContent />
    </div>
  );
}

function Separator() {
  return (
    <div className="flex gap-3 items-center">
      <span className="h-px w-full bg-white" />
      <span>or</span>
      <span className="h-px w-full bg-white" />
    </div>
  );
}

function PartnerContent() {
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
