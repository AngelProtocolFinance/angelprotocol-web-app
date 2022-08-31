import { useRegistrationState } from "services/aws/registration";
import ContactDetailsForm from "./ContactDetailsForm";

export default function ContactDetails() {
  const { charity } = useRegistrationState();

  return (
    <div>
      <h3 className="text-3xl font-bold mb-10">
        {charity.ContactPerson.PK
          ? "Update your contact details."
          : "Let's start with your contact details."}
      </h3>
      {!charity.ContactPerson.PK && (
        <p className="text-xl mb-6">
          This information will let us know more about your organization and who
          you are. Once this form is submitted, you will be able to resume your
          registration if it gets interrupted in the future.
        </p>
      )}
      <ContactDetailsForm charity={charity} />
    </div>
  );
}
