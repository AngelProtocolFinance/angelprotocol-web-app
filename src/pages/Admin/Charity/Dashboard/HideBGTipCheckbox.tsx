import { yupResolver } from "@hookform/resolvers/yup";
import { CheckField, Form } from "components/form";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { useErrorContext } from "contexts/ErrorContext";
import { UseFormReturn, useForm } from "react-hook-form";
import { bool, object } from "yup";

export default function HideBGTipCheckbox() {
  const { handleError } = useErrorContext();
  const methods = useForm({
    resolver: yupResolver(object({ hideBgTip: bool() })),
    defaultValues: { hideBgTip: false },
    mode: "onChange",
  });
  const {
    handleSubmit,
    formState: { isSubmitting, dirtyFields },
  } = methods;

  type FV = typeof methods extends UseFormReturn<infer U> ? U : never;

  const submit = async (fv: FV) => {
    try {
      throw "unimplemented";
    } catch (err) {
      handleError(err, GENERIC_ERROR_MESSAGE);
    }
  };

  return (
    <Form
      methods={methods}
      className="grid gap-2 col-span-2 text-sm"
      disabled={isSubmitting}
      onSubmit={handleSubmit(submit)}
    >
      <span>
        During the donation flow, there is a step in which users can choose to
        tip us any amount they desire alongside their donation to you - the
        amount they tip will not affect the donation amount you receive. You may
        choose to turn this step off in the donation flow by ticking the
        checkbox below and we will instead apply a fixed 1.5% fee to any
        donation amount you receive.
      </span>
      <CheckField<FV> name="hideBgTip">
        Opt out of tip-based donations
      </CheckField>
      <button
        className="justify-self-end btn-orange w-40"
        disabled={dirtyFields.hideBgTip == null}
      >
        Save
      </button>
    </Form>
  );
}
