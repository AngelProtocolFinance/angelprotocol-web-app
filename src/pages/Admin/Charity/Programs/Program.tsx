import type { Program as TProgram } from "@better-giving/endowment";
import Image from "components/Image";
import LoaderRing from "components/LoaderRing";
import { adminRoutes } from "constants/routes";
import { toWithState } from "helpers/state-params";
import { useFetcher } from "react-router-dom";
import { Link } from "react-router-dom";

export function Program(props: TProgram) {
  const fetcher = useFetcher();

  const isDeleting = fetcher.state !== "idle";

  return (
    <div
      className={`p-6 border border-gray-l4 rounded ${
        isDeleting ? "bg-gray-l4" : "bg-gray-l6"
      } grid @lg:flex items-center gap-x-4 gap-y-8`}
    >
      <div className="flex items-center gap-x-4 @lg:contents">
        <Image
          src={props.banner}
          alt="program banner"
          className="w-10 aspect-square object-cover"
        />
        <p className="font-bold">{props.title}</p>
      </div>

      {isDeleting ? (
        <LoaderRing thickness={10} classes="@lg:ml-auto w-6" />
      ) : (
        <fetcher.Form
          action="."
          method="DELETE"
          className="flex items-center gap-x-4 @lg:contents"
        >
          <button
            type="submit"
            name="programId"
            value={props.id}
            className="btn-outline-filled w-24 py-2 text-sm @lg:ml-auto"
          >
            delete
          </button>
          <Link
            to={toWithState(
              `../${adminRoutes.program_editor}/${props.id}`,
              props
            )}
            className="btn-outline-filled w-24 py-2 text-sm"
          >
            edit
          </Link>
        </fetcher.Form>
      )}
    </div>
  );
}
