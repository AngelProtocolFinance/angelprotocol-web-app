import { MouseEventHandler } from "react";
import { FaCheck } from "react-icons/fa";
import { User } from "services/user/types";
import Button from "../Button";

type Props = {
  userData: User;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
};

export default function VerificationSuccessful(props: Props) {
  const { userData, onClick, isLoading } = props;

  return (
    <div className="flex flex-col gap-10 items-center">
      <FaCheck className="text-4xl text-yellow-blue" />
      <div className="text-2xl font-bold">
        <p>Thank you for registering.</p>
        <p>
          {userData.CharityName}, {userData.FirstName}!
        </p>
      </div>
      <div className="text-2xl font-bold">
        <p>Your registration reference is</p>
        <p className="text-yellow-600">{userData.PK}</p>
      </div>
      <p>We have sent it to your email address for your future reference.</p>
      <Button
        className="bg-thin-blue w-48 h-12"
        onClick={onClick}
        disabled={isLoading}
        isLoading={isLoading}
      >
        Continue
      </Button>
    </div>
  );
}
