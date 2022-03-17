import { MouseEventHandler } from "react";
import { FaExclamation } from "react-icons/fa";
import { Button } from "../common";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
};

export default function LinkExpired({ onClick, isLoading }: Props) {
  return (
    <div className="flex flex-col gap-10 items-center">
      <FaExclamation className="text-4xl text-red-500" />
      <p className="text-2xl font-bold">
        Your verification link has expired. Please resend the verification
        email.
      </p>
      <Button
        className="bg-thin-blue w-64 h-12 text-sm"
        onClick={onClick}
        isLoading={isLoading}
      >
        Resend verification email
      </Button>
    </div>
  );
}
