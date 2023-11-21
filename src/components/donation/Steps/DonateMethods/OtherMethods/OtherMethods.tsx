import { useState } from "react";
import { FormStep } from "slices/donation";
import DAFDirect from "./DAFDirect";
import Stocks from "./Stocks";

type Type = "stocks" | "daf";

type Props = { state: FormStep };

export default function OtherMethods(_props: Props) {
  const [type, setType] = useState<Type>();
  return (
    <div className="flex gap-3 md:gap-5 justify-center font-body mt-4">
      {!type ? (
        <>
          <button
            className="btn-outline btn-donate w-1/2"
            type="button"
            onClick={() => setType("stocks")}
          >
            Stocks
          </button>
          <button
            className="btn-outline btn-donate w-1/2"
            type="button"
            onClick={() => setType("daf")}
          >
            DAF
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-5">
          {type === "stocks" ? <Stocks /> : <DAFDirect />}
          <button
            className="btn-outline-filled btn-donate w-1/2"
            type="button"
            onClick={() => setType(undefined)}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
