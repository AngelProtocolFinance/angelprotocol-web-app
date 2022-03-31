import ContactDetailsForm from "./ContactDetailsForm";
import { useGetter } from "store/accessors";

export default function ContactDetails() {
  const user = useGetter((state) => state.user);
  return (
    <div>
      <h3 className="text-3xl font-bold mb-10">
        {user.PK
          ? "Update your contact details."
          : "Let's start with your contact details."}
      </h3>
      <ContactDetailsForm contactData={user} />
    </div>
  );
}
