import { Link } from "react-router-dom";
import { Separator } from "components/registration";
import { APP_NAME } from "constants/env";
import routes from "../routes";
import useSubmit from "./useSubmit";

const NEED_HELP_ARTICLE_ID = 6628120;

export default function Form({ classes = "" }: { classes?: string }) {
  const { handleSubmit, isSubmitting } = useSubmit();

  const openIntercomHelp = () => {
    const w = window as any;
    if ("Intercom" in w) {
      w.Intercom("showArticle", NEED_HELP_ARTICLE_ID);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${classes} justify-center gap-8 padded-container w-full max-w-[37.5rem] grid`}
    >
      <h3 className="text-3xl text-center">{`Register with ${APP_NAME}`}</h3>

      <button
        type="submit"
        className="btn-orange btn-reg"
        disabled={isSubmitting}
      >
        Start a new application
      </button>
      <Separator classes="before:mr-2 after:ml-2">OR</Separator>

      <Link
        className="btn-outline-filled btn-reg"
        to={routes.resume}
        aria-disabled={isSubmitting}
      >
        Resume your registration
      </Link>

      <button
        type="button"
        className="underline text-orange-l1 justify-self-center text-sm"
        onClick={openIntercomHelp}
      >
        Need Help?
      </button>
    </form>
  );
}
