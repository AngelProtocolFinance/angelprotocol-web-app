import { useRegistrationQuery } from "services/aws/registration";
import ContactDetailsForm from "./ContactDetailsForm";

export default function ContactDetails() {
  const { charity } = useRegistrationQuery();

  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <h3 className="text-3xl font-bold mb-5">
        {charity.ContactPerson.PK
          ? "Update your contact details."
          : "Let's start with your contact details."}
      </h3>
      {!charity.ContactPerson.PK && (
        <p className="text-xl">
          This information will let us know more about your organization and who
          you are. Once this form is submitted, you will be able to resume your
          registration if it gets interrupted in the future.
        </p>
      )}
      <ContactDetailsForm application={charity} />
    </div>
  );
}
