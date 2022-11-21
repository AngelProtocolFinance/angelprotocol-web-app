import { FormValues } from "./types";
import { BtnPrim, BtnSec, Separator, TextInput } from "components/registration";
import useSubmit from "./useSubmit";

export default function Form({ classes = "" }: { classes?: string }) {
  const { submit, isSubmitting } = useSubmit();
  return (
    <form
      onSubmit={submit}
      className={`${classes} grid padded-container w-full max-w-[37.5rem]`}
    >
      <h3 className="text-3xl font-bold text-center">Resume registration</h3>
      <p className="text-center mt-2 text-gray-d1 dark:text-gray-l2 text-lg">
        Enter your registration reference to resume where you left off
      </p>

      <TextInput<FormValues>
        name="reference"
        label="Registration reference"
        placeholder="e.g. 00000000-0000-0000-0000-000000000000"
        classes={{ container: "mt-8 mx-0 sm:mx-24" }}
      />

      <BtnPrim
        type="submit"
        className="mt-8 mx-0 sm:mx-24"
        disabled={isSubmitting}
      >
        Resume
      </BtnPrim>
      <Separator classes="my-11 mx-0 sm:mx-24 before:mr-2 after:ml-2">
        OR
      </Separator>
      <BtnSec
        as="link"
        className="mx-0 sm:mx-24"
        to=".."
        aria-disabled={isSubmitting}
      >
        Register new account
      </BtnSec>
    </form>
  );
}
