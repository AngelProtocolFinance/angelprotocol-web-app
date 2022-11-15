import { FormProvider, useForm } from "react-hook-form";
import { ContactRoles, ReferralMethods } from "types/aws";
import { Label } from "components/form";
import {
  BtnPrim,
  OptionType,
  Selector,
  TextInput,
} from "components/registration";

export default function ContactForm() {
  const methods = useForm({
    defaultValues: {
      role: { value: "ceo", label: "CEO" },
      referralMethod: { value: "twitter", label: "Twitter" },
    },
  });

  async function fakeSubmit() {
    await new Promise((r) => setTimeout(r, 1500));
    alert("submitted");
  }

  return (
    <FormProvider {...methods}>
      <form
        className="padded-container max-w-[45.5rem] justify-self-center mt-28"
        onSubmit={methods.handleSubmit(fakeSubmit)}
      >
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
        <Label required className="mb-2">
          What's your role within the organization?
        </Label>
        <Selector<any, any, ContactRoles, false>
          name="role"
          options={roleOptions}
        >
          {({ value }) =>
            value === "other" && (
              <TextInput
                name="otherRole"
                label="Specify your role"
                required
                classes={{ container: "mt-4" }}
              />
            )
          }
        </Selector>

        <h3 className="font-bold mt-8 mb-4">Other information</h3>
        <Label required className="mb-2">
          How did you find about us?
        </Label>
        <Selector<any, any, ReferralMethods, false>
          name="referralMethod"
          options={referralOptions}
        >
          {({ value }) =>
            value === "other" && (
              <TextInput
                name="otherReferral"
                label="Other referral method"
                required
                classes={{ container: "mt-4" }}
              />
            )
          }
        </Selector>
        <TextInput
          name="goals"
          label="Goals"
          placeholder="What is your goal working with Angel Protocol?"
          classes={{ container: "mt-4" }}
          required
        />
        <BtnPrim type="submit" className="my-8 py-3 px-8 w-full sm:w-auto">
          Continue
        </BtnPrim>
      </form>
    </FormProvider>
  );
}

const roles: { [key in ContactRoles]: string } = {
  president: "Chairperson / President",
  "vice-president": "Vice-chairperson / Vice president",
  secretary: "Secretary",
  treasurer: "Treasurer",
  ceo: "CEO",
  cfo: "CFO",
  "board-member": "Board Member",
  "leadership-team": "Leadership Team",
  "fundraising-finance": "Fundraising / Finance",
  legal: "Legal",
  communications: "Communications",
  other: "Other",
};

const referralMethods: { [key in ReferralMethods]: string } = {
  "angel-alliance": "Angel Alliance",
  discord: "Discord",
  facebook: "Facebook",
  linkedin: "Linkedin",
  medium: "Medium",
  press: "Press",
  "search-engines": "Search engines",
  twitter: "Twitter",
  other: "Other",
};

function genOptions<T extends object>(
  objOptions: T
): T extends { [key in infer R]: any } ? OptionType<R>[] : OptionType<never>[] {
  return Object.entries(objOptions).map(([value, label]) => ({
    value,
    label,
  })) as any;
}

const roleOptions = genOptions(roles);
const referralOptions = genOptions(referralMethods);
