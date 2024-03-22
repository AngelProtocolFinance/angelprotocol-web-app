import { yupResolver } from "@hookform/resolvers/yup";
import { Field, Form as _Form } from "components/form";
import { useErrorContext } from "contexts/ErrorContext";
import { useForm } from "react-hook-form";
import { schema } from "schemas/shape";
import { useEditEndowmentMutation } from "services/aws/aws";
import { string } from "yup";
import { FV } from "./types";

type Props = {
  id: number;
  receiptMsg?: string;
};

export default function Form(props: Props) {
  const [submit] = useEditEndowmentMutation();
  const { handleError } = useErrorContext();
  const methods = useForm({
    resolver: yupResolver(
      schema<FV>({
        receiptMsg: string().max(100),
      })
    ),
    defaultValues: { receiptMsg: props.receiptMsg ?? "" },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  return (
    <_Form
      disabled={isSubmitting}
      methods={methods}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      onSubmit={handleSubmit(async (fv) => {
        try {
          await submit({ id: props.id, receiptMsg: fv.receiptMsg }).unwrap();
        } catch (err) {
          handleError(err);
        }
      })}
      className="w-full max-w-4xl justify-self-center grid content-start gap-6 mt-6"
    >
      <Field<FV, "textarea">
        type="textarea"
        classes="field-admin"
        name="receiptMsg"
        label="Receipt message"
        placeholder="your message to your donor"
      />
      <div className="flex gap-3">
        <button
          type="reset"
          className="px-6 btn-outline-filled text-sm"
          disabled={!isDirty}
        >
          Reset changes
        </button>
        <button
          type="submit"
          className="px-6 btn-blue text-sm"
          disabled={!isDirty}
        >
          Submit changes
        </button>
      </div>
    </_Form>
  );
}
