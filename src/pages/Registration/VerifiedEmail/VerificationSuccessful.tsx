import { MouseEventHandler, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { User } from "pages/Registration/store";
import { updateUser } from "pages/Registration/store";
import { useSetter } from "store/accessors";
import { Button } from "../common";

type Props = {
  userData: User;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
};

export default function VerificationSuccessful(props: Props) {
  const { userData, onClick, isLoading } = props;
  const dispatch = useSetter();

  useEffect(() => {
    dispatch(updateUser(userData));
  }, [dispatch, userData]);

  return (
    <div className="flex flex-col gap-10 items-center">
      <FaCheck className="text-4xl text-yellow-blue" />
      <div className="text-2xl font-bold">
        <p>Thank you for registering.</p>
        <p>
          {userData.Registration.CharityName},{" "}
          {userData.ContactPerson.FirstName}!
        </p>
      </div>
      <div className="text-2xl font-bold">
        <p>Your registration reference is</p>
        <p className="text-yellow-600">{userData.ContactPerson.PK}</p>
      </div>
      <Button
        className="bg-thin-blue w-48 h-12"
        onClick={onClick}
        isLoading={isLoading}
      >
        Continue
      </Button>
    </div>
  );
}
