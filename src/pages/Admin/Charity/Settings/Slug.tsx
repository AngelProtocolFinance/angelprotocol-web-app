import { Field } from "components/form";
import { FV } from "./types";

export default function Slug() {
  return (
    <div>
      <Field<FV, "textarea">
        type="textarea"
        classes="field-admin"
        name="receiptMsg"
        label="Receipt message"
        placeholder="your message to your donor"
      />
      <p className="text-xs sm:text-sm text-navy-l1 italic mt-4"></p>
    </div>
  );
}
