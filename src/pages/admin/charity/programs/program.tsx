import type { Program as TProgram } from "@better-giving/endowment";
import { useFetcher } from "@remix-run/react";
import { Link } from "@remix-run/react";
import Image from "components/image";
import LoaderRing from "components/loader-ring";
import { adminRoutes } from "constants/routes";

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
            to={`../${adminRoutes.program_editor}/${props.id}`}
            className="btn-outline-filled w-24 py-2 text-sm"
          >
            edit
          </Link>
        </fetcher.Form>
      )}
    </div>
  );
}
