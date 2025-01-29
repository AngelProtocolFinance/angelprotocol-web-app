import { Link, useFetcher } from "@remix-run/react";
import { Separator } from "components/separator";
import { APP_NAME } from "constants/env";
import { regRoutes } from "constants/routes";

const NEED_HELP_ARTICLE_ID = 6628120;

export default function Form({ classes = "" }: { classes?: string }) {
  const fetcher = useFetcher();

  const openIntercomHelp = () => {
    const w = window as any;
    if ("Intercom" in w) {
      w.Intercom("showArticle", NEED_HELP_ARTICLE_ID);
    }
  };

  return (
    <fetcher.Form
      action="?index"
      method="POST"
      className={`${classes} justify-center gap-8 px-5 w-full max-w-2xl grid`}
    >
      <h3 className="text-3xl text-center">
        Register your new {APP_NAME} nonprofit account
      </h3>

      <button
        disabled={fetcher.state !== "idle"}
        type="submit"
        className="btn btn-blue btn-reg"
      >
        Start a new application
      </button>
      <Separator classes="before:mr-2 after:ml-2">OR</Separator>

      <Link className="btn-outline btn btn-reg" to={regRoutes.resume}>
        Resume your registration
      </Link>

      <button
        type="button"
        className="underline text-blue-d1 justify-self-center text-sm"
        onClick={openIntercomHelp}
      >
        Need Help?
      </button>
    </fetcher.Form>
  );
}
