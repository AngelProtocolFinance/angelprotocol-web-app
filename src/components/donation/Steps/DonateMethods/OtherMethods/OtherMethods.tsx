import { useState } from "react";
import Icon from "components/Icon";
import { FormStep } from "slices/donation";
import DAFDirect from "./DAFDirect";
import Stocks from "./Stocks";

type Type = "stocks" | "daf";

type Props = { state: FormStep };

export default function OtherMethods(props: Props) {
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
        <div className="grid gap-5">
          <button
            className="text-blue hover:text-orange text-sm flex items-center gap-1 justify-self-start"
            type="button"
            onClick={() => setType(undefined)}
          >
            <Icon type="Back" />
            Back
          </button>
          {type === "stocks" ? (
            <>
              <Stocks state={props.state} />
              <button
                className="text-blue hover:text-orange text-sm flex items-center gap-1 justify-self-start"
                type="button"
                onClick={() => setType(undefined)}
              >
                <Icon type="Back" />
                Back
              </button>
            </>
          ) : (
            <DAFDirect />
          )}
        </div>
      )}
    </div>
  );
}
