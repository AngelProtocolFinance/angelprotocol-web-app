import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useCreateNewMemberMutation } from "services/aws/alliance/alliance";
import { useSetModal } from "components/Modal/Modal";
import { MemberEditValues as MV } from "./schema";

export default function useModifyMember() {
  const {
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<MV>();
  const { hideModal } = useSetModal();

  const [error, setError] = useState<string | null>(null);
  const [createMember] = useCreateNewMemberMutation();

  async function modifyMember(data: MV) {
    const response = await createMember(data);
    if ("error" in response) {
      setError("failed to add member");
    } else {
      hideModal();
    }
  }

  return {
    error,
    modifyMember: handleSubmit(modifyMember),
    isSubmitDisabled: !isDirty || !isValid || isSubmitting,
  };
}
