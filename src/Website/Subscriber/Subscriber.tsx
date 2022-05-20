import { ErrorMessage } from "@hookform/error-message";
import Loader from "components/Loader";
import useSubscribe from "./useSubscribe";

export default function Subscriber() {
  const { register, isSubmitting, subscribe, errors } = useSubscribe();
  return (
    <form
      onSubmit={subscribe}
      autoComplete="off"
      className="relative flex flex-col md:flex-row items-center lg:items-start"
    >
      <input
        {...register("email")}
        placeholder="Email"
        disabled={isSubmitting}
        autoComplete="off"
        type="text"
        className="block p-2 rounded-md  disabled:bg-thin-grey text-blue-accent font-semibold focus:outline-none focus:ring-2 focus:ring-white-grey/50"
      />
      <ErrorMessage
        errors={errors}
        name="email"
        as="span"
        className="static mt-2 md:absolute md:left-0 md:-bottom-6 text-sm text-white-grey"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="text-white-grey font-semibold text-sm block ml-2 mt-5 md:mt-0 bg-angel-orange disabled:bg-grey-accent hover:bg-orange px-5 py-1 uppercase rounded-md shadow-md w-36 h-10"
      >
        {isSubmitting ? (
          <Loader bgColorClass="bg-white" widthClass="w-3" gapClass="gap-1" />
        ) : (
          "Subscribe"
        )}
      </button>
    </form>
  );
}
