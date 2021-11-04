import { ContactDetailsForm } from "components/ContactDetailsForm/ContactDetailsForm";
import { ToastContainer } from "react-toastify";
import { useGetter } from "store/accessors";

const ContactDetails = () => {
  const user = useGetter((state) => state.user);
  return (
    <div>
      <h3 className="text-3xl font-bold mb-10">
        {user
          ? "Update your contact details."
          : "Let's start with your contact details."}
      </h3>
      <p className="text-xl mb-6">
        {!user &&
          "This information will let us know more about your organization and who you are. Once this form is submitted, you will be able to resume your registration if it gets interrupted in the future."}
      </p>
      <ContactDetailsForm contactData={user} />
      <ToastContainer />
    </div>
  );
};

export default ContactDetails;
