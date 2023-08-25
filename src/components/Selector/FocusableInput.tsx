import { RefCallBack } from "react-hook-form";

export default function FocusableInput(props: { ref: RefCallBack }) {
  /** add this so hook-form can focus on this field if didn't pass validation */
  return (
    <input
      ref={props.ref}
      aria-hidden
      className="peer h-0 w-0 focus:outline-none absolute"
      tabIndex={-1}
    />
  );
}
