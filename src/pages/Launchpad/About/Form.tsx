import { Field } from "components/form";
import Form, { Desc, FormProps, Title } from "../common/Form";

export default function AboutForm(props: FormProps) {
  return (
    <Form {...props}>
      <Title className="mb-2">About</Title>
      <Desc className="mb-8">
        Tell us more about your Angel Impact Fund. You will be able to fill a
        detailed profile once your AIF is created.
      </Desc>
      <Field
        name="name"
        label="Name"
        placeholder="Name of your Angel Impact Fund"
        required
        tooltip="Maximum 60 characters"
        classes={{ container: "mb-4" }}
      />
      <Field
        name="tagline"
        label="Tagline"
        placeholder="Tagline that best describes the purpose of your AIF"
        required
        tooltip="Maximum 140 characters"
        classes={{ container: "mb-4" }}
      />
      <button
        type="submit"
        className="text-sm mt-8 py-3 px-8 w-full sm:w-auto btn-orange"
      >
        Continue
      </button>
    </Form>
  );
}
