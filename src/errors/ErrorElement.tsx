import { logger } from "helpers";
import { useEffect, useRef } from "react";
import { useRouteError } from "react-router";
import DefaultFallback from "./DefaultFallback";

export function ErrorElement() {
  const error = useRouteError();

  const elementRef = useRef<HTMLButtonElement>(null);

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
        <button
          ref={elementRef}
          onClick={() => {
            window.location.reload();
          }}
          className="border border-gray-l4 rounded-lg px-6 py-2"
        >
          OK
        </button>
      }
    />
  );
}
