import { useFormContext } from "react-hook-form";
import { VoteValues as VV } from "./types";
import Icon from "components/Icon";
import { TextInput } from "components/admin";

export default function Reason() {
  const { watch, getValues } = useFormContext<VV>();
  const vote = watch("vote");
  const existingReason = watch("existingReason");

  const type = getValues("type");
  if (!(vote === "no" && type === "application")) {
    return null;
  }

  return (
    <div>
      {existingReason && (
        <p className="text-orange-d2 bg-orange-l4 text-sm p-2 rounded-md mb-2">
          <Icon type="Info" className="inline relative bottom-0.5 mr-0.5" />
          <span>Note: this will update prior reason for rejection</span>
        </p>
      )}
      <TextInput<VV> name="reason" title="reason" />
    </div>
  );
}
