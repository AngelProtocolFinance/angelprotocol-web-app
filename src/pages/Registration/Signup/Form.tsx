import { Link, useNavigate } from "react-router-dom";
import { Separator } from "components/registration";
import { APP_NAME } from "constants/env";
import { regRoutes } from "constants/routes";

const NEED_HELP_ARTICLE_ID = 6628120;

export default function Form({ classes = "" }: { classes?: string }) {
  const navigate = useNavigate();

  const openIntercomHelp = () => {
    const w = window as any;
    if ("Intercom" in w) {
      w.Intercom("showArticle", NEED_HELP_ARTICLE_ID);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate(regRoutes.welcome);
      }}
      className={`${classes} justify-center gap-8 padded-container w-full max-w-[37.5rem] grid`}
    >
      <h3 className="text-3xl text-center">
        Register your new {APP_NAME} nonprofit account
      </h3>

      <button type="submit" className="btn-orange btn-reg">
        Start a new application
      </button>
      <Separator classes="before:mr-2 after:ml-2">OR</Separator>

      <Link className="btn-outline-filled btn-reg" to={regRoutes.resume}>
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
