import { useRouteError } from "@remix-run/react";
import { logger } from "helpers";
import { useEffect } from "react";
import { Modal } from "../modal";
import { DefaultFallback } from "./default-fallback";

export function ErrorModal() {
  const error = useRouteError();

  //biome-ignore lint: log onmount only
  useEffect(() => {
    logger.error(error);
  }, []);

  return (
    <Modal
      open={true}
      onClose={() => window.location.reload()}
      classes="fixed-center z-10 grid text-navy-d4 bg-white sm:w-full w-[90vw] sm:max-w-lg rounded-sm overflow-hidden"
    >
      <div className="px-6 pb-4 text-center text-navy-l1 mt-4">
        <DefaultFallback />
      </div>
      <div className="p-3 sm:px-8 sm:py-4 empty:h-12 w-full text-center sm:text-right bg-blue-l5 border-t border-gray-l4">
        <button
          onClick={() => window.location.reload()}
          type="button"
          className="inline-block btn-blue px-8 py-2 max-sm:w-full"
        >
          Ok
        </button>
      </div>
    </Modal>
  );
}
