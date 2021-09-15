import { ContactDetailsForm } from "components/ContactDetailsForm/ContactDetailsFrom";

const ContactDetails = () => {
  const contactInfo = JSON.parse(localStorage.getItem("userData") || "");
  return (
    <div>
      <h3 className="text-3xl font-bold mb-10">
        Let's start with your contact details.
      </h3>
      <p className="text-xl mb-6">
        This information will let us know more about your organization and who
        you are. Once this form is submitted, you will be able to resume your
        registration if it gets interrupted in the future.
      </p>
      <ContactDetailsForm contactData={contactInfo} />
    </div>
  );
};

export default ContactDetails;
