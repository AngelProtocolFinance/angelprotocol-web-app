import { Field } from "components/form";

type Props = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  classes?: string;
};

export default function Form({ classes = "", onSubmit }: Props) {
  return (
    <form
      className={`w-full bg-white dark:bg-blue-d6 ${classes}`}
      onSubmit={onSubmit}
    >
      <h2 className="font-bold text-center sm:text-left text-xl mb-2">About</h2>
      <p className="text-center sm:text-left text-lg mb-8">
        Tell us more about your Angel Impact Fund. You will be able to fill a
        detailed profile once your AIF is created.
      </p>
      <Field
        name="name"
        label="Name"
        placeholder="Name of your Angel Impact Fund"
        required
        classes={{ container: "mb-4" }}
      />
      <Field
        name="tagline"
        label="Tagline"
        placeholder="Tagline that best describes the purpose of your AIF"
        required
        classes={{ container: "mb-4" }}
      />
      <button
        type="submit"
        className="mt-8 py-3 px-8 w-full sm:w-auto btn-orange"
      >
        Continue
      </button>
    </form>
  );
}
