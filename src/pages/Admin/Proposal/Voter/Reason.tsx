import { useFormContext } from "react-hook-form";
import { VoteValues as VV } from "./types";
import { TextInput } from "components/admin";

export default function Reason() {
  const { watch, getValues } = useFormContext<VV>();
  const vote = watch("vote");
  return (
    (vote === "no" && getValues("type") === "application" && (
      <TextInput<VV> name="reason" title="reason" />
    )) ||
    null
  );
}
