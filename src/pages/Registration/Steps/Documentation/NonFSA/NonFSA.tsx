import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import { FormValues as FV, Props } from "./types";
import { Field } from "components/form";
import { LoadText } from "components/registration";
import { steps } from "../../../routes";
import useSubmit from "./useSubmit";

export default function Form(props: Props) {
  const { doc } = props;
  const methods = useForm<FV>({
    resolver: yupResolver(object({ EIN: string().required("required") })),
    defaultValues: doc
      ? doc
      : {
          EIN: "",
        },
  });
  const { submit, isSubmitting } = useSubmit({ props, form: methods });

  return (
    <form className="w-full" onSubmit={submit}>
      <Field<FV>
        name="EIN"
        label="EIN#"
        required
        classes={{ container: "mb-6 mt-1" }}
        placeholder="e.g. xx-xxxxxxxxxx"
      />

      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <Link
          aria-disabled={isSubmitting}
          to={`../${steps.fsaInquiry}`}
          state={props.init}
          className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <button
          disabled={isSubmitting}
          type="submit"
          className="py-3 min-w-[8rem] btn-orange btn-reg"
        >
          <LoadText isLoading={isSubmitting}>Continue</LoadText>
        </button>
      </div>
    </form>
  );
}
