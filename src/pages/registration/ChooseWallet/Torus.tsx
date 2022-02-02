import gmailIcon from "assets/images/gmail.png";
import {
  ChangeEvent,
  ChangeEventHandler,
  PropsWithChildren,
  useCallback,
} from "react";
import { BsDiscord } from "react-icons/bs";
import { FaFacebook, FaTwitch } from "react-icons/fa";
import { ButtonHTMLAttributes } from "react";

export default function Torus() {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value),
    []
  );

  return (
    <div className="flex flex-col justify-between bg-green-500 h-96 w-96 p-4">
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
      <InputEmail onChange={handleChange} />
      <Button
        className="bg-opacity-40"
        onClick={() => console.log("continue with email")}
      >
        Continue with Email
      </Button>
    </div>
  );
}

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

function Button(props: ButtonProps) {
  const { children, className, ...buttonProps } = props;

  return (
    <button
      className={`flex gap-3 h-12 w-full justify-center items-center bg-white rounded-sm ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
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

type InputEmailProps = { onChange: ChangeEventHandler<HTMLInputElement> };

function InputEmail({ onChange }: InputEmailProps) {
  return (
    <input
      type="string"
      className="flex h-12 w-full justify-center rounded-sm pl-4 outline-none bg-white text-angel-grey text-sm"
      placeholder="Enter your email"
      onChange={onChange}
    />
  );
}
