import { MouseEventHandler, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { Charity } from "@types-server/aws";
import { useSetter } from "store/accessors";
import { Button } from "../common";
import { updateCharity } from "../store";

type Props = {
  charity: Charity;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
};

export default function VerificationSuccessful(props: Props) {
  const { charity, onClick, isLoading } = props;
  const dispatch = useSetter();

  useEffect(() => {
    dispatch(updateCharity(charity));
  }, [dispatch, charity]);

  return (
    <div className="flex flex-col gap-10 items-center">
      <FaCheck className="text-4xl text-yellow-blue" />
      <div className="text-2xl font-bold">
        <p>Thank you for registering.</p>
        <p>
          {charity.Registration.CharityName}, {charity.ContactPerson.FirstName}!
        </p>
      </div>
      <div className="text-2xl font-bold">
        <p>Your registration reference is</p>
        <p className="text-yellow-600">{charity.ContactPerson.PK}</p>
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
