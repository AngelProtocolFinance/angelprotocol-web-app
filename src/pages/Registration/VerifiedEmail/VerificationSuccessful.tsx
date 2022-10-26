import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UnprocessedApplication } from "types/aws";
import { storeRegistrationReference } from "helpers";
import { appRoutes } from "constants/routes";
import { Button } from "../common";
import routes from "../routes";

export default function VerificationSuccessful({
  newCharity,
}: {
  newCharity: UnprocessedApplication;
}) {
  const navigate = useNavigate();

  function handleContinue() {
    storeRegistrationReference(newCharity.ContactPerson.PK!);
    navigate(`${appRoutes.register}/${routes.dashboard}`);
  }

  return (
    <div className="flex flex-col gap-10 items-center">
      <FaCheck className="text-4xl text-green-l1" />
      <div className="text-2xl font-bold">
        <p>Thank you for registering.</p>
        <p>
          {newCharity.Registration.OrganizationName},{" "}
          {newCharity.ContactPerson.FirstName}!
        </p>
      </div>
      <div className="text-2xl font-bold">
        <p>Your registration reference is</p>
        <p className="text-orange">{newCharity.ContactPerson.PK}</p>
      </div>
      <Button
        className="btn-orange uppercase w-48 h-12"
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
}
