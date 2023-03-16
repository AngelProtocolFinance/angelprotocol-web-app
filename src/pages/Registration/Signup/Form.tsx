import { Link } from "react-router-dom";
import { FormValues as FV } from "./types";
import ExtLink from "components/ExtLink";
import { CheckField, Field } from "components/form";
import { Separator } from "components/registration";
import { APP_NAME } from "constants/common";
import { PRIVACY_POLICY } from "constants/urls";
import routes from "../routes";
import useSubmit from "./useSubmit";

const NEED_HELP_ARTICLE_ID = 6628120;

export default function Form({ classes = "" }: { classes?: string }) {
  const { submit, isSubmitting } = useSubmit();

  const openIntercomHelp = () => {
    const w = window as any;
    if ("Intercom" in w) {
      w.Intercom("showArticle", NEED_HELP_ARTICLE_ID);
    }
  };

  return (
    <form
      onSubmit={submit}
      className={`${classes} padded-container w-full max-w-[37.5rem] grid`}
    >
      <h3 className="text-3xl font-bold text-center">
        {`Register to ${APP_NAME}`}
      </h3>

      <Field<FV>
        name="email"
        label="E-mail"
        placeholder="e.g. johndoe@example.com"
        classes={{ container: "mt-8 mx-0 sm:mx-24" }}
      />
      <CheckField<FV>
        required
        name="hasAgreedToPrivacyPolicy"
        classes={{
          container: "check-field-reg justify-self-center mt-6 mb-8 text-xs",
          error: "mt-2",
        }}
      >
        I declare that I have read and agreed to{" "}
        <ExtLink className="underline text-orange" href={PRIVACY_POLICY}>
          Privacy Policy
        </ExtLink>
      </CheckField>

      <button
        type="submit"
        className="mt-8 mx-0 sm:mx-24 btn-orange btn-reg"
        disabled={isSubmitting}
      >
        Register
      </button>
      <Separator classes="my-11 mx-0 sm:mx-24 before:mr-2 after:ml-2">
        OR
      </Separator>

      <Link
        className="mx-0 sm:mx-24 btn-outline-filled btn-reg"
        to={routes.resume}
        aria-disabled={isSubmitting}
      >
        Resume your registration
      </Link>

      <button
        type="button"
        className="underline text-orange justify-self-center mt-6 text-sm"
        onClick={openIntercomHelp}
      >
        Need Help?
      </button>
    </form>
  );
}
