import gmailIcon from "assets/images/gmail.png";
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";
import { BsDiscord } from "react-icons/bs";
import { FaFacebook, FaTwitch } from "react-icons/fa";
import Button from "./Button";
import PartnerContent from "./PartnerContent";

export default function Torus() {
  return (
    <div className="flex flex-col justify-between bg-green-500 h-96 w-96 p-4 rounded-xs">
      <Button onClick={() => console.log("connect with Google")}>
        <img src={gmailIcon} alt="Google" height={30} width={30} />
        <span className="text-dark-grey">Continue with Google</span>
      </Button>

      <div className="flex justify-between gap-4">
        <Button onClick={() => console.log("connect with Facebook")}>
          <FaFacebook className="text-angel-blue" size={30} />
        </Button>
        <Button onClick={() => console.log("connect with Twitch")}>
          <FaTwitch className="text-purple-500" size={30} />
        </Button>
        <Button onClick={() => console.log("connect with Discord")}>
          <BsDiscord className="text-indigo-400" size={30} />
        </Button>
      </div>

      <Separator />

      <ContinueWithEmail
        onClick={(value: string) => console.log(`continue with Email ${value}`)}
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

type InputEmailProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

function InputEmail({ onChange, value }: InputEmailProps) {
  return (
    <input
      type="string"
      className="flex h-12 w-full justify-center rounded-sm pl-4 outline-none bg-white text-angel-grey text-sm"
      placeholder="Enter your email"
      onChange={onChange}
      value={value}
    />
  );
}

type ContinueWithEmailProps = {
  onClick: (value: string) => void;
};

function ContinueWithEmail({ onClick }: ContinueWithEmailProps) {
  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );
  const handleClick = useCallback(() => onClick(value), [onClick]);

  return (
    <div className="flex flex-col gap-3">
      <InputEmail value={value} onChange={handleChange} />
      <Button
        className="bg-opacity-40 hover:bg-opacity-50"
        onClick={handleClick}
      >
        Continue with Email
      </Button>
    </div>
  );
}
