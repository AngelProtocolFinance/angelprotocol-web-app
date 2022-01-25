import { useGetStatus } from "./Endowment_Admin";
import toCurrency from "helpers/toCurrency";
import { ResultProps } from "./types";

export default function Results(props: ResultProps) {
  const { message, result } = useGetStatus();
  const withdrawn = toCurrency(result?.withdrawn);

  return (
    <div className="p-3 md:p-6 bg-white-grey w-full max-w-xs rounded-xl shadow-lg overflow-hidden relative">
      <h3 className="mb-3 text-lg text-angel-grey text-center font-semibold font-heading">
        {message}
      </h3>
      <div className="p-2 font-heading text-angel-grey">
        <p className="w-full mb-5 grid uppercase font-semibold text-center">
          <span className="text-xs">Withdrawn Amount :</span>
          <span className="">~{withdrawn} UST</span>
        </p>
        <p className="text-xs text-center">
          <a
            className="hover:text-blue-accent text-angel-blue"
            href={result?.url}
            target="_blank"
            rel="noreferrer"
          >
            View Transaction Details
          </a>
        </p>
      </div>
      <div className="flex flex-row mt-3">
        <button
          onClick={props.onCloseModal}
          className="m-auto uppercase hover:bg-angel-orange hover:text-white-grey hover:border-opacity-0 rounded-lg w-28 h-8 text-angel-orange border-2 border-angel-orange text-sm font-bold"
        >
          Close
        </button>
      </div>
    </div>
  );
}
