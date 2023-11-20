import { useState } from "react";
import { Helmet } from "react-helmet";

type Type = "stocks" | "daf";

type Props = {};

export default function Other(_props: Props) {
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
      ) : type === "stocks" ? (
        <div className="grid items-center gap-5">
          <h3 className="text-2xl sm:text-3xl mb-4 sm:mb-12 text-center leading-relaxed">
            Stocks
          </h3>
          <p>Coming Soon! 😃</p>
          <button
            className="btn-outline-filled btn-donate w-40"
            type="button"
            onClick={() => setType(undefined)}
          >
            Back
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <h3 className="text-2xl sm:text-3xl mb-4 sm:mb-12 text-center leading-relaxed">
            DAF
          </h3>
          <p>Donation using DAFDirect widget direct to Better Giving.</p>
          <iframe
            title="DAFDirect Widget"
            src="/dafdirect-widget.html"
            width="180"
            height="300"
          ></iframe>
          <button
            className="btn-outline-filled btn-donate w-40"
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
