import { Field } from "components/form";
import { useFormContext } from "react-hook-form";
import { MAX_RECEIPT_MSG_CHAR } from "./constants";
import type { FV } from "./types";

export default function ReceiptMsg() {
  const { watch } = useFormContext<FV>();
  const receipMsg = watch("receiptMsg");
  return (
    <div>
      <Field<FV, "textarea">
        rows={5}
        type="textarea"
        classes={{
          container: "field-admin [&_[data-error]]:-bottom-4",
          label: "text-base font-medium",
        }}
        name="receiptMsg"
        label="Tax Receipt message for donors"
        placeholder="Your nonprofit's message to all donors"
      />
      <p
        data-exceed={receipMsg.length > MAX_RECEIPT_MSG_CHAR}
        className="text-xs text-navy-l1 data-[exceed='true']:text-red"
      >
        {receipMsg.length}/{MAX_RECEIPT_MSG_CHAR}
      </p>
      <p className="text-xs sm:text-sm text-navy-l1 italic mt-1">
        This is an optional message that can be included on all tax receipts to
        your donors to add a personalized touch, a thank you, or a call to
        action.
      </p>
    </div>
  );
}
