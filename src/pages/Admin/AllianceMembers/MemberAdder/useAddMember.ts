import { useFormContext } from "react-hook-form";
import { MemberAdderValues as MV } from "./schema";

export default function useAddMember() {
  const {
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<MV>();
  async function addMember(data: MV) {
    console.log(data);
  }

  return {
    addMember: handleSubmit(addMember),
    isSubmitDisabled: !isDirty || !isValid || isSubmitting,
  };
}
