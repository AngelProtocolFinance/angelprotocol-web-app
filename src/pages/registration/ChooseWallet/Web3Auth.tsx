import gmailIcon from "assets/images/gmail.png";
import { useCallback } from "react";
import { BsDiscord } from "react-icons/bs";
import { FaFacebook, FaTwitch } from "react-icons/fa";
import ButtonSocial from "./ButtonSocial";
import ContinueWithEmail from "./ContinueWithEmail";
import PartnerContent from "./PartnerContent";

export default function Web3Auth() {
  const handleContinueWithEmail = useCallback(
    (value: string) => console.log(`continue with Email ${value}`),
    []
  );

  return (
    <div className="flex flex-col justify-between bg-green-500 h-96 w-96 p-4 rounded-xs">
      <ButtonSocial onClick={() => console.log("connect with Google")}>
        <img src={gmailIcon} alt="Google" height={30} width={30} />
        <span className="text-dark-grey">Continue with Google</span>
      </ButtonSocial>

      <div className="flex justify-between gap-4">
        <ButtonSocial onClick={() => console.log("connect with Facebook")}>
          <FaFacebook className="text-angel-blue" size={30} />
        </ButtonSocial>
        <ButtonSocial onClick={() => console.log("connect with Twitch")}>
          <FaTwitch className="text-purple-500" size={30} />
        </ButtonSocial>
        <ButtonSocial onClick={() => console.log("connect with Discord")}>
          <BsDiscord className="text-indigo-500" size={30} />
        </ButtonSocial>
      </div>

      <Separator />

      <ContinueWithEmail onClick={handleContinueWithEmail} />

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
