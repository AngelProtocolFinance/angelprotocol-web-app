import { useLocation } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import RegLoader from "../common/RegLoader";
import { placeHolderCharity } from "../constants";
import ContactDetailsForm from "./ContactDetailsForm";

export default function ContactDetails() {
  const location = useLocation();
  const { data: charity = placeHolderCharity, isLoading } =
    useRegistrationQuery((location.state as any)?.is_new ? "new" : "");

  if (isLoading) {
    return <RegLoader />;
  }

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
