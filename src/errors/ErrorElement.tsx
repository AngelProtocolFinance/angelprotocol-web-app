import { logger } from "helpers";
import { useEffect, useRef } from "react";
import { Link, useRouteError } from "react-router-dom";
import DefaultFallback from "./DefaultFallback";

export function ErrorElement() {
  const error = useRouteError();

  const elementRef = useRef<HTMLAnchorElement>(null);

  //biome-ignore lint: log onmount only
  useEffect(() => {
    logger.error(error);
  }, []);

  useEffect(() => {
    if (!elementRef.current) return;
    elementRef.current.scrollIntoView({ block: "center" });
  }, []);

  return (
    <DefaultFallback
      acknowledger={
        <Link
          ref={elementRef}
          to="."
          className="border border-gray-l4 rounded-lg px-6 py-2"
        >
          OK
        </Link>
      }
    />
  );
}
