import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UnprocessedCharity } from "types/aws";
import { storeRegistrationReference } from "helpers";
import { appRoutes } from "constants/routes";
import { Button } from "../common";
import routes from "../routes";

export default function VerificationSuccessful({
  newCharity,
}: {
  newCharity: UnprocessedCharity;
}) {
  const navigate = useNavigate();

  function handleContinue() {
    storeRegistrationReference(newCharity.ContactPerson.PK!);
    navigate(`${appRoutes.register}/${routes.dashboard}`);
  }

  return (
    <div className="flex flex-col gap-10 items-center">
      <FaCheck className="text-4xl text-yellow-blue" />
      <div className="text-2xl font-bold">
        <p>Thank you for registering.</p>
        <p>
          {newCharity.Registration.CharityName},{" "}
          {newCharity.ContactPerson.FirstName}!
        </p>
      </div>
      <div className="text-2xl font-bold">
        <p>Your registration reference is</p>
        <p className="text-yellow-600">{newCharity.ContactPerson.PK}</p>
      </div>
      <Button className="bg-thin-blue w-48 h-12" onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
}
