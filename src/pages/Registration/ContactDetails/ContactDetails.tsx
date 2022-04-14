import { useGetter } from "store/accessors";
import ContactDetailsForm from "./ContactDetailsForm";

export default function ContactDetails() {
  const user = useGetter((state) => state.user);
  return (
    <div>
      <h3 className="text-3xl font-bold mb-10">
        {user.ContactPerson.PK
          ? "Update your contact details."
          : "Let's start with your contact details."}
      </h3>
      {!user.ContactPerson.PK && (
        <p className="text-xl mb-6">
          This information will let us know more about your organization and who
          you are. Once this form is submitted, you will be able to resume your
          registration if it gets interrupted in the future.
        </p>
      )}
      <ContactDetailsForm user={user} />
    </div>
  );
}
