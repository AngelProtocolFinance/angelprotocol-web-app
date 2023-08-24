import { FormValues as FV, Props } from "./types";
import Addresses from "components/Addresses";
import { Tooltip } from "components/admin";
import useEditWhitelists from "./useSubmit";

export default function Form(props: Props) {
  const { submit, reset, isSubmitting, tooltip } = useEditWhitelists(
    props.operation
  );

  return (
    <form
      onSubmit={submit}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      className={`${props.classes} w-full border border-prim rounded p-4 md:p-8 bg-white dark:bg-blue-d6`}
    >
      <h4 className="text-xl font-bold mb-8">{props.title}</h4>
      {tooltip && <Tooltip tooltip={tooltip} classes="mb-8" />}
      <fieldset className="contents group" disabled={!!tooltip}>
        <Addresses<FV, "addresses">
          memberName={props.memberName}
          name="addresses"
          title={props.title}
          emptyMsg={props.emptyMessage}
          classes="mb-8"
        />
        <div className="grid grid-cols-2 sm:flex gap-2 m-2 group-disabled:hidden">
          <button
            type="reset"
            disabled={isSubmitting}
            className="text-sm px-8 btn-outline-filled"
          >
            Reset Changes
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-sm px-8 btn-orange"
          >
            Submit Changes
          </button>
        </div>
      </fieldset>
    </form>
  );
}
