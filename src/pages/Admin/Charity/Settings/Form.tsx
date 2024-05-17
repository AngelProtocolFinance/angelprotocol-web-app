import { yupResolver } from "@hookform/resolvers/yup";
import { CheckField, Form as _Form } from "components/form";
import { useForm } from "react-hook-form";
import { schema } from "schemas/shape";
import type { Endowment, EndowmentSettingsAttributes } from "types/aws";
import { string } from "yup";
import { useUpdateEndowment } from "../common";
import HideBGTipCheckbox from "./HideBGTipCheckbox";
import ReceiptMsg from "./ReceiptMsg";
import { MAX_RECEIPT_MSG_CHAR } from "./constants";
import type { FV } from "./types";

type Props = Pick<Endowment, "id" | EndowmentSettingsAttributes>;

export default function Form(props: Props) {
  const updateEndow = useUpdateEndowment();

  const methods = useForm({
    resolver: yupResolver(
      schema<FV>({
        receiptMsg: string().max(MAX_RECEIPT_MSG_CHAR, "exceeds max"),
      })
    ),
    values: {
      receiptMsg: props.receiptMsg ?? "",
      sfCompounded: props.sfCompounded ?? false,
      hide_bg_tip: props.hide_bg_tip ?? false,
      programDonateAllowed: props.programDonateAllowed ?? true,
    },
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
        await updateEndow({ ...fv, id: props.id });
      })}
      className="w-full max-w-4xl justify-self-center grid content-start gap-6 mt-6"
    >
      <ReceiptMsg />
      <div>
        <CheckField<FV> name="sfCompounded" classes={{ label: "font-medium" }}>
          Reinvest dividends from Sustainability Fund
        </CheckField>
        <p className="text-xs sm:text-sm text-navy-l1 italic mt-1">
          Let your dividends work harder for you! By reinvesting growth, you're
          giving your Sustainability Fund balance a boost and ensuring your
          mission has the support it needs to thrive. Your funds remain
          available to you as needed.
        </p>
      </div>

      <HideBGTipCheckbox />

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
