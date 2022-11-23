import { FormValues as FV } from "./types";
import Checkbox from "components/Checkbox";
import {
  BtnPrim,
  BtnSec,
  Separator,
  TextInput,
  checkBoxStyle,
} from "components/registration";
import { PRIVACY_POLICY } from "constants/urls";
import routes from "../routes";
import useSubmit from "./useSubmit";

export default function Form({ classes = "" }: { classes?: string }) {
  const { submit, isSubmitting } = useSubmit();
  return (
    <form
      onSubmit={submit}
      className={`${classes} padded-container w-full max-w-[37.5rem] grid`}
    >
      <h3 className="text-3xl font-bold text-center">
        Register to Angel Protocol
      </h3>

      <TextInput<FV>
        name="email"
        label="E-mail"
        placeholder="e.g. johndoe@example.com"
        classes={{ container: "mt-8 mx-0 sm:mx-24" }}
      />
      <Checkbox<FV>
        required
        name="hasAgreedToPrivacyPolicy"
        classes={{
          container: "justify-self-center mt-6 mb-8 text-xs",
          checkbox: checkBoxStyle,
          error: "mt-2",
        }}
      >
        I declare that I have read and agreed to{" "}
        <a
          className="underline text-orange"
          target="_blank"
          href={PRIVACY_POLICY}
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </Checkbox>

      <BtnPrim
        type="submit"
        className="mt-8 mx-0 sm:mx-24"
        disabled={isSubmitting}
      >
        Register
      </BtnPrim>
      <Separator classes="my-11 mx-0 sm:mx-24 before:mr-2 after:ml-2">
        OR
      </Separator>

      <BtnSec
        as="link"
        className="mx-0 sm:mx-24"
        to={routes.resume}
        aria-disabled={isSubmitting}
      >
        Resume your registration
      </BtnSec>
    </form>
  );
}
