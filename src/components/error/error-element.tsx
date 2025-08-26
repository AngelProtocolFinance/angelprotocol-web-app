import { appRoutes } from "constants/routes";
import { CircleAlert } from "lucide-react";
import { useEffect, useRef } from "react";
import { NavLink, isRouteErrorResponse, useRouteError } from "react-router";
import { DefaultFallback } from "./default-fallback";

export function ErrorElement() {
  const error = useRouteError();

  const elementRef = useRef<HTMLButtonElement>(null);

  //biome-ignore lint: log onmount only
  useEffect(() => {
    console.error(error);
  }, []);

  useEffect(() => {
    if (!elementRef.current) return;
    elementRef.current.scrollIntoView({ block: "center" });
  }, []);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="grid place-items-center content-center gap-6 p-4">
          <CircleAlert className="text-red" size={50} />
          <p className="-mt-4">404</p>
          <p className="text-center">
            The resource you requested was not found
          </p>
          <NavLink
            to={appRoutes.marketplace}
            className="btn btn-outline text-sm px-6 py-2 rounded-full"
          >
            Back
          </NavLink>
        </div>
      );
    }
  }

  return (
    <DefaultFallback
      acknowledger={
        <button
          ref={elementRef}
          onClick={() => {
            window.location.reload();
          }}
          className="border border-gray-l3 rounded-lg px-6 py-2"
        >
          OK
        </button>
      }
    />
  );
}
