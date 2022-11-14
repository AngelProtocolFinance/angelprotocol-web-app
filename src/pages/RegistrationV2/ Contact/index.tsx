import { FormProvider, useForm } from "react-hook-form";
import { Label } from "components/form";
import { BtnPrim, TextInput } from "components/registration";
import Selector from "./Selector";

export default function ContactForm() {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form className="padded-container max-w-[45.5rem] justify-self-center mt-28">
        <h2 className="font-bold text-center sm:text-left text-xl mb-2">
          Let's start with your contact details
        </h2>
        <p className="text-center sm:text-left text-lg mb-8">
          This information will let us know more about your organization and who
          you are. Once this form is submitted, you will be able to resume your
          registration if it gets interrupted in the future.
        </p>
        <h3 className="font-bold mb-4">Personal information</h3>
        <TextInput
          name="firstName"
          label="First name"
          placeholder="e.g. John"
          required
          classes={{ container: "mb-4" }}
        />
        <TextInput
          name="lastName"
          label="Last name"
          placeholder="e.g. Doe"
          required
          classes={{ container: "mb-4" }}
        />
        <TextInput
          name="phone"
          label="Phone number"
          placeholder="000000000"
          required={false}
          classes={{ container: "mb-4" }}
        />
        <TextInput
          name="email"
          label="E-mail address"
          value="placeholderEmail@mail.com"
          required
          disabled
        />
        <h3 className="font-bold mt-8 mb-4">Organization information</h3>
        <TextInput
          name="orgName"
          label="Name of your organization"
          placeholder="Organization name"
          classes={{ container: "mb-4" }}
          required
        />
        <div>
          <Label required className="mb-2">
            What's your role within the organization?
          </Label>
          <Selector
            name="role"
            placeholder="CEO"
            options={[
              "Chairperson / President",
              "Vice-chairperson / Vice president",
              "Secretary",
              "Treasurer",
              "CEO",
              "CFO",
              "Board Member",
              "Leadership Team",
              "Fundraising / Finance",
              "Legal",
              "Communications",
            ]}
          />
        </div>

        <h3 className="font-bold mt-8 mb-4">Other information</h3>
        <div className="mb-4">
          <Label required className="mb-2">
            How did you find out about us?
          </Label>
          <Selector
            name="referralMethod"
            placeholder="Angel alliance"
            options={[
              "Angel Alliance",
              "Discord",
              "Facebook",
              "Linked",
              "Medium",
              "Press",
              "Search Engines",
              "Twitter",
            ]}
          />
        </div>
        <TextInput
          name="goals"
          label="Goals"
          placeholder="What is your goal working with Angel Protocol?"
          required
        />
        <BtnPrim className="my-8 py-3 px-8 w-full sm:w-auto">Continue</BtnPrim>
      </form>
    </FormProvider>
  );
}
