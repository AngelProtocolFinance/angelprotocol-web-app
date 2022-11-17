import { MouseEventHandler } from "react";
import { FaExclamation } from "react-icons/fa";
import { BtnPrim } from "components/registration";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
};

export default function LinkExpired({ onClick, isLoading }: Props) {
  return (
    <div className="flex flex-col gap-10 items-center">
      <FaExclamation className="text-4xl text-red" />
      <p className="text-2xl font-bold">
        Your verification link has expired. Please resend the verification
        email.
      </p>
      <BtnPrim onClick={onClick} disabled={isLoading}>
        Resend verification email
      </BtnPrim>
    </div>
  );
}
