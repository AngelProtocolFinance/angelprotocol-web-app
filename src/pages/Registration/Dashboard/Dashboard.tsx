import { useRegistrationState } from "services/aws/registration";
import Steps from "./Steps";
import Submit from "./Submit";
import useSubmit from "./Submit/useSubmit";
import getRegistrationState from "./getRegistrationState";

export default function Dashboard() {
  const { data } = useRegistrationState("");
  const charity = data!; //charity is available as checked by guard
  const { submit } = useSubmit();

  const isDataSubmitted =
    charity.Registration.RegistrationStatus !== "Inactive";
  const state = getRegistrationState(charity);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h3 className="text-3xl font-bold">Necessary Information</h3>
      <span>
        Please complete all the following steps to be able to create your
        endowment
      </span>
      <Steps disabled={isDataSubmitted} registrationState={state} />
      <Submit onSubmit={submit} />
    </div>
  );
}
