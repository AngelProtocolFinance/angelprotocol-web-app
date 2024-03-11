import { yupResolver } from "@hookform/resolvers/yup";
import { CheckField, Form } from "components/form";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { useErrorContext } from "contexts/ErrorContext";
import { useAdminContext } from "pages/Admin/Context";
import { UseFormReturn, useForm } from "react-hook-form";
import { useToggleBgTipScreenMutation } from "services/aws/aws";
import { bool, object } from "yup";

export default function HideBGTipCheckbox() {
  const { id } = useAdminContext();
  const { handleError } = useErrorContext();
  const [toggleBgTipScreen] = useToggleBgTipScreenMutation();

  const methods = useForm({
    resolver: yupResolver(object({ hideBgTip: bool().required() })),
    defaultValues: { hideBgTip: false },
    mode: "onChange",
  });

  type FV = typeof methods extends UseFormReturn<infer U> ? U : never;

  const submit = async (fv: FV) => {
    try {
      await toggleBgTipScreen({ id, hide_bg_tip: fv.hideBgTip }).unwrap();
    } catch (err) {
      handleError(err, GENERIC_ERROR_MESSAGE);
    }
  };

  const {
    handleSubmit,
    formState: { isSubmitting, dirtyFields },
  } = methods;

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
